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
	if (file.exists("outputs/binned.csv")) {
		print("Reding binned data")
		data <- read.csv("outputs/binned.csv", check.names = FALSE)
		rn <- data[[""]]
		data <- as.matrix(data[-1])
		rownames(data) <- rn
		return(data)
	}
	print("Reading trips")
	data <- read.csv("outputs/trips.csv")
	print("Binning trips")
	binned <- bin_trip_times(data)
	dir.create("outputs", FALSE, FALSE)
	write.csv(data, "outputs/binned.csv", row.names = FALSE)
	binned
}

fit_simple_model <- function(data) {
	print("Fitting STAN model")
	options(mc.cores = parallel::detectCores())
	rstan_options(auto_write = TRUE)
	n <- ncol(data) / (24 * 7 * 2)
	means <- t(apply(data, 1, function(row) sapply(1:(24*7), function(i) mean(row[seq(i, ncol(data), 24*7)]))))
	means[is.na(means)] <- 0
	vars <- t(apply(data, 1, function(row) sapply(1:(24*7), function(i) sd(row[seq(i, ncol(data), 24*7)]))))
	vars[is.na(vars)] <- 0.2
	vars <- vars * 0.9 + 0.2
	sdata <- list(D=data, w=n, s=nrow(data), means=means, vars=vars)
	rstan::stan("prediction/simple_model.stan", data = sdata)
}

extract_fit <- function(fit, collab, rowlab) {
	out <- extract(fit, c("lp__", "B"))
	maxB <- out$B[which.max(out$lp__),,]
	meanB <- apply(out$B, 2:3, mean)
	sdB <- apply(out$B, 2:3, sd)
	collab <- c(paste(collab, "mean"), paste(collab, "max"), paste(collab, "sd"))
	B <- cbind(meanB, maxB, sdB)
	colnames(B) <- collab
	rownames(B) <- rowlab
	B
}


# Only run from Rscript
if (sys.nframe() == 0L) {
	binned <- prepare_bins()
	day <- "2019-09-25T00"
	index <- which(colnames(binned) == day)
	data <- binned[, (index - 24*7*12):(index - 1)]
	fit <- fit_simple_model(data)
	saveRDS(fit, "outputs/simple_model.rds", compress="xz")
	model <- extract_fit(fit, colnames(binned[, index:(index + 24*7 - 1)]), rownames(binned))
	write.csv(model, "outputs/simple_model.csv")
}
