
# This function takes a dataframe that contains a column of all
# the station ids called "id" and returns a dataframe with two
# columns ("id1" and "id2") with all combinations of ids
id_permutations <- function(stations, unused=NULL) {
	combinations <- do.call(rbind, lapply(stations$id, function(id) {
		data.frame(id1=id, id2=stations$id[stations$id != id])
	}))
	return(list(combinations=combinations))
}


# This function takes the output from `id_permutations` and the dataframe
# of all trips. The function calculates the quantile(dur_qt) duration of
# the trip and the quantile(dis_qt) distance for each combination
# (discarding those with too little information). The return is a
# dataframe of "DepartureID", "ReturnID", "Duration", and "Distance".
calculate_distances <- function(combinations, trips, dur_qt=0.75, dis_qt=0.2) {
	durs <- c(rep(NA, nrow(combinations)))
	dists <- c(rep(NA, nrow(combinations)))
	for (i in 1:nrow(combinations)) {
		mask <- which(trips$DepartureID == combinations$id1[[i]] & trips$ArrivalID == combinations$id2[[i]])
		if (length(mask) < 3)
			next()
		times <- trips$Duration[mask]
		lengths <- trips$Distance[mask]
		durs[i] <- unname(quantile(times, dur_qt))
		dists[i] <- unname(quantile(lengths, dis_qt))
	}
	mask <- !is.na(durs)
	return(list(distances=data.frame(
		"DepartureID" = combinations$id1[mask],
		"ArrivalID" = combinations$id2[mask],
		"Duration" = durs[mask],
		"Distance" = dists[mask],
		check.names = FALSE
	)))
}

read_data_trips <- function() {
	data <- do.call(rbind, lapply(4:10, function(i) {
		read.csv(sprintf("data/trips-2019-%02d.csv", i), header = TRUE)
	}))
	data <- data.frame(Departure = data$Departure, Arrival = data$Return,
		DepartureID = data$Departure.station.id, ArrivalID = data$Return.station.id,
		Distance = data$Covered.distance..m., Duration = data$Duration..sec..
	)
	data[complete.cases(data), ]
}

# Only run from Rscript
if (sys.nframe() == 0L) {
	source("prediction/station_status.R")
	source("prediction/predict_bikes.R")
	print("Reading Data")
	stations <- read_data_stations(42)
	trips <- read_data_trips()
	dir.create("outputs", FALSE, FALSE)
	write.csv(trips, "outputs/trips.csv", row.names = FALSE)
	print("Calculating Distances")
	combs <- id_permutations(stations)$combinations
	dists <- calculate_distances(combs, trips)$distances
	write.csv(dists, "outputs/distances.csv", row.names = FALSE)
}
