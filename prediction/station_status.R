
randomise_bikes <- function(stations, unused) {
	stations <- stations[stations$operative, ]
	stations$operative <- NULL
	stations$bikes <- as.integer(round(runif(nrow(stations), 0, stations$total_slot)))
	return(list(dataset1=stations, dataset2=data.frame()))
}
