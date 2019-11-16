library(dplyr)
library(rstan)

bin_trip_times <- function(data) {
	data <- data[complete.cases(data), ]
	ids <- c(data$DepartureID, data$ArrivalID)
	delta <- c(rep(-1, nrow(data)), rep(1, nrow(data)))
	times <- c(as.character(data$Departure), as.character(data$Arrival))
	times <- stringr::str_sub(times, 0, 13)

	df <- data.frame(id = ids, time = times, delta = delta)
	df <- df %>% group_by(id, time) %>% summarize(sum(delta))

	un_times <- unique(stringr::str_sub(df$time, end = stringr::str_locate(df$time, "T")))
	un_times <- un_times[!is.na(un_times) & un_times != "NA"]
	un_times <- as.vector(unlist(sapply(0:23, function(i) sprintf("%s%02d", un_times, i))))
	un_times <- sort(un_times)
	un_id <- unique(df$id)
	un_id <- un_id[un_id > 0 & !is.na(un_id)]
	
	mat <- matrix(rep(0, length(un_id)*length(un_times)), length(un_id), length(un_times))
	colnames(mat) <- un_times
	rownames(mat) <- un_id

	for (i in 1:nrow(df)) {
		try(mat[df$id[[i]], df$time[[i]]] <- df$`sum(delta)`[[i]], silent = TRUE)
	}

	mat
}

prepare_bins <- function() {
	if (file.exists("outputs/binned.csv"))
		return(as.matrix(read.csv("outputs/binned.csv")))
	print("Reading trips")
	data <- read.csv("outputs/trips.csv")
	print("Binning trips")
	binned <- bin_trip_times(data)
	dir.create("outputs", FALSE, FALSE)
	write.csv(data, "outputs/binned.csv", row.names = FALSE)
	binned
}

fit_simple_model <- function(data)


# Only run from Rscript
if (sys.nframe() == 0L) {
	binned <- prepare_bins()

}
