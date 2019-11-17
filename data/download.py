"""
	Script for downloading the data for the project

	Sources:
	https://hri.fi/data/en_GB/dataset/hsl-n-kaupunkipyoraasemat
	https://hri.fi/data/en_GB/dataset/helsingin-ja-espoon-kaupunkipyorilla-ajatut-matkat
	https://en.ilmatieteenlaitos.fi/download-observations

"""
from urllib.request import urlretrieve
from pathlib import Path

def download_biketrips(years=range(2019, 2020), months=range(4, 11)):
	dir = Path("data")
	for year in years:
		for month in months:
			name = f"{year}-{month:02}.csv"
			url = f"http://dev.hsl.fi/citybikes/od-trips-{year}/{name}"
			name = "trips-" + name
			target = dir / name
			if target.exists():
				print("Already downloaded", name)
				continue
			try:
				urlretrieve(url, target)
				print("Downloaded", name)
			except:
				print("Could not download", name)

def download_stations():
	try:
		urlretrieve("https://opendata.arcgis.com/datasets/1b492e1a580e4563907a6c7214698720_0.csv", "data/stations-2019.csv")
		print("Downloaded", "stations-2019.csv")
	except:
		print("Could not download", "stations-2019.csv")

def download_weather():
	#THIS LINK NEEDS TO BE UPDATED EACH TIME
	urlretrieve("https://cdn.fmi.fi/fmiodata-convert-api/output/csv-c8eec4e9-70c8-4b8c-9fa6-5bf848fa4fbc.csv", "data/weather.csv")

if __name__ == "__main__":
	download_biketrips()
	download_stations()
