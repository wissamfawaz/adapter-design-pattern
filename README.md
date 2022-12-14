# Your Location-Based Reminder

The Location-Based Meeting Reminder application  aims to ensure that users
 never arrive late to an event by sending a reminder 10 minutes prior leaving for a set meeting based on the user's current location, the set destination and factors that may cause delay on the road.  Tardiness and traffic
  come together to create a common issue we face on a daily
   basis. Therefore, the application at hand was created to resolve arriving late to the designated appointment.



## Installation
Download the zipped scr file [here](https://github.com/VanessaHanna05/adapter-design-pattern/archive/refs/heads/main.zip)

Extract the documents of the src folder.

Run the Command Line in the designated folder and write: ./index.html + click Enter




## Deployment and Work System

Usage:

Click on the spefic day to set one or more meetings

Set the type of the meeting to get a certain alert message

Allow the application to have access to your location

Give a meeting title based on your preferences

Insert the location of the meeting that can be viewed from google maps

Set the meeting time 

Delete:
delete meetings easily from the event summary by clicking on the trash logo



## Note

Internet connection is needed for the map and api to work

## API

The [Here API](https://developer.here.com/) was used for location tracking and duration calculation

Each api key generated has a certain amount of free runs therefore we have prepared a new API.

When running the code and looking in the console, if the error 429 occurs, the limit of the API key has been exceeded, so inserting a new API key will do the job.

THe new API key is: Zv5xVF2zNQuc6q9yCMQjnjON7z39p-bvBzCEqOfNTtk

The new API key replaces the old one in two functions: the getCoordinates function and the getDuration function

The API key is inserted after the following expression: apiKey= 

After changing the api key, the code should run with no errors. 


## Code Analysis

All troubleshooting was done through the console of the insepct option in the browser in which the application is running.

The information  popping in the console are irrelevant for the functionalities of the actual code however they were useful when checking if the code is working properly in the background. 
