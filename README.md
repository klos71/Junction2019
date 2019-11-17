# BIKEBALANCE - Junction 2019
## Problem: 
Bike stations are often located where many people either get on or off them. This would leave many some stations full and others empty, which requires service men driving around the Helsinki region trying to balance the bike stations.

We thought that there is was a way for us to predict how the bikes move around,  and therefore create an UI for servicemen to see which stations are going to be empty and full (in the coming hours). We also envision that everyday people  would  be able to help via an app that gives "quests" and rewards for move around bikes and help with the balancing (gamifying the process). This save  on usage of trucks  going around balancing the stations, make the job for the servicemen easier, and provide exercise for citizens.

## Social Impact
With this application we can predict the stations' load throughout the day and try to encourage the citizens to use the bikes more (due to the higher availability of bikes) and save  the climate! This application provided with a special "[Maintenence-UI](https://klosbook.klos71.net)" will make the everyday work for service men around Helsinki easier by predicting when and where they are needed, while also trying to offload some work  through quests for normal people.

## Tech
With Ms Azure we have been able to train probabilistic models (R + stan) that can predict the hourly change of the number of bikes at each station. We also have a  backend (Java) server running on Azure is able to send the quests to our users to stop station overflowing. We also have an app (React native) for the citizens, that handles quests and awards, and a webpage for the maintenance (React js) that helps service men to intervene on predicted chaos much much faster

## Future Plans
This application could easily have the impact to encourage many users around Helsinki to start biking more often, and with the system of  awards available we can encourage users to enjoy Helsinki, e.g. with tickets to buses, museums,  promotional campaigns by companies located in Helsinki and more. This would preferably be integrated in the bigger HSL infrastructure, maybe as a sister app to the main HSL app.

# Images
![alt text](https://github.com/klos71/Junction2019/raw/master/images/image1.jpeg  "Logo Title Text 1")
![alt text](https://github.com/klos71/Junction2019/raw/master/images/image2.jpeg  "Logo Title Text 1")
![alt text](https://github.com/klos71/Junction2019/raw/master/images/image3.jpeg  "Logo Title Text 1")
![alt text](https://github.com/klos71/Junction2019/raw/master/images/image4.jpeg  "Logo Title Text 1")
![alt text](https://github.com/klos71/Junction2019/raw/master/images/image5.jpeg  "Logo Title Text 1")
![alt text](https://github.com/klos71/Junction2019/raw/master/images/image6.jpeg  "Logo Title Text 1")
