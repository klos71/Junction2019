

# This function takes a dataframe (stations) that contains
# a column of all the station ids called "id" and returns
# a list where the first item is a dataframe with two columns
# "id1" and "id2" of all combinations of ids
id_permutations <- function(stations, unused) {
	list(do.call(rbind, lapply(stations$id, function(id) {
		data.frame(id1=id, id2=stations$id[stations$id != id])
	})), NULL)
}


# This function takes the output from `id_permutations` and
# The dataframe of all trips and calculates the quantile(dur_qt)
# duration of the trip and the quantile(dis_qt) distance for each
# combination (discarding those with
# too little information). The return is a list where the first
# item is a dataframe of "DepartureId", "ReturnId",
# "Duration", and "Distance".
calculate_distances <- function(combinations, trips, dur_qt=0.75, dis_qt=0.2) {
	durs <- c(rep(na, nrow(combinations)))
	dists <- c(rep(na, nrow(combinations)))
	for (i in 1:nrow(combinations)) {
		mask <- which(trips["Departure station id"] == combinations$id1[[i]] & trips["Return station id"] == combinations$id2[[i]])
		if (length(mask) < 3)
			next()
		times <- trips[["Duration (sec.)"]][mask]
		lengths <- trips[["Covered distance (m)"]][mask]
		durs[i] <- unname(quantile(times, dur_qt))
		dists[i] <- unname(quantile(lengths, dis_qt))
	}
	mask <- !is.na(durs)
	list(data.frame(
		"DepartureId" = combinations$id1[mask],
		"ArrivalId" = combinations$id2[mask],
		"Duration" = durs[mask],
		"Distance" = dists[mask],
		check.names = FALSE
	), NULL)
}
