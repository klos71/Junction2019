
# This function takes a dataframe that contains a column of all
# the station ids called "id" and returns a dataframe with two
# columns ("id1" and "id2") with all combinations of ids
id_permutations <- function(stations, unused) {
	combinations <- do.call(rbind, lapply(stations$id, function(id) {
		data.frame(id1=id, id2=stations$id[stations$id != id])
	}))
	return(list(dataset1=combinations, dataset2=data.frame()))
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
		mask <- which(trips["DepartureID"] == combinations$id1[[i]] & trips["ArrivalID"] == combinations$id2[[i]])
		if (length(mask) < 3)
			next()
		times <- trips[["Duration"]][mask]
		lengths <- trips[["Distance"]][mask]
		durs[i] <- unname(quantile(times, dur_qt))
		dists[i] <- unname(quantile(lengths, dis_qt))
	}
	mask <- !is.na(durs)
	return(list(dataset1=data.frame(
		"DepartureID" = combinations$id1[mask],
		"ArrivalID" = combinations$id2[mask],
		"Duration" = durs[mask],
		"Distance" = dists[mask],
		check.names = FALSE
	), dataset2=data.frame()))
}


# Only run from Rscript
if (sys.nframe() == 0L) {
	source("prediction/station_status.R")
	source("prediction/predict_bikes.R")
	stations <- read_data_stations(42)
	trips <- read_data_trips()
	dir.create("outputs", FALSE, FALSE)
	write.csv(trips, "outputs/trips.csv", row.names = FALSE)
	combs <- id_permutations(stations)
	write.csv(combs, "outputs/combinations.csv", row.names = FALSE)
}
