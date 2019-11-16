

read_data_stations <- function(seed = 42) {
	set.seed(seed)
	data <- read.csv("data/stations-2019.csv")
	data.frame(
		X = data$X, Y = data$Y, id = data$id, name = data$name,
		total_slot = data$total_slot, bikes = runif(nrow(data), 0, data$total_slot)
	)[data$operative, ]
}

randomise_bikes <- function(stations) {
	stations <- stations[stations$operative, ]
	stations$operative <- NULL
	stations$bikes <- as.integer(round(runif(nrow(stations), 0, stations$total_slot)))
	return(list(dataset1=stations, dataset2=data.frame()))
}

# Only run from Rscript
if (sys.nframe() == 0L) {
	data <- read_data_stations()
	dir.create("outputs", FALSE, FALSE)
	write.csv(data, "outputs/stations.csv")
}
