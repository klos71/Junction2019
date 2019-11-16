
read_data_trips <- function() {
	data <- do.call(rbind, lapply(4:10, function(i) {
		read.csv(sprintf("data/trips-2019-%02d.csv", i), header = TRUE)
	}))
	data.frame(Departure = data$Departure, Arrival = data$Return,
		DepartureID = data$Departure.station.id, ArrivalID = data$Return.station.id,
		Distance = data$Covered.distance..m., Duration = data$Duration..sec..
	)
}
