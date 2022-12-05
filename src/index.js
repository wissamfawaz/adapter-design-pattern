let nav = 0;
let clicked = null;
let origin_coordinates = "";
let destination_coordinates = "";
let duration = 0;
let timePickerValue = "";
let timeDifference = 0;
let watchId = 0;
let interval = 0;
let addressLink = "";

let events = localStorage.getItem("events")
  ? JSON.parse(localStorage.getItem("events"))
  : [];

const calendar = document.getElementById("calendar");
const newEventModal = document.getElementById("newEventModal");
const deleteEventModal = document.getElementById("deleteEventModal");
const backDrop = document.getElementById("modalBackDrop");

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// Modal Input Fields
const eventTitleInput = document.getElementById("eventTitleInput");
const city = document.getElementById("eventCityInput");
const country = document.getElementById("eventCountryInput");
const locationName = document.getElementById("eventLocationName");
const timePicker = document.getElementById("timePicker");
const meetingType = document.getElementById("types");
const currentMeeting = document.getElementById("types");

let eventList = document.getElementById("event-list");

function initButtons() {
  // To Move to Next Month
  document.getElementById("nextButton").addEventListener("click", () => {
    nav++;
    load();
  });

  // To Move to Previous Month
  document.getElementById("backButton").addEventListener("click", () => {
    nav--;
    load();
  });

  document.getElementById("saveButton").addEventListener("click", saveEvent);
  document.getElementById("cancelButton").addEventListener("click", closeModal);
}

// Function to Load Calendar
function load() {
  const dt = new Date();

  if (nav !== 0) {
    dt.setMonth(new Date().getMonth() + nav);
  }

  const day = dt.getDate();
  const month = dt.getMonth();
  const year = dt.getFullYear();

  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const dateString = firstDayOfMonth.toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  const paddingDays = weekdays.indexOf(dateString.split(", ")[0]);

  document.getElementById("monthDisplay").innerText = `${dt.toLocaleDateString(
    "en-us",
    { month: "long" }
  )} ${year}`;

  calendar.innerHTML = "";

  for (let i = 1; i <= paddingDays + daysInMonth; i++) {
    const daySquare = document.createElement("div");
    daySquare.classList.add("day");

    const dayString = `${month + 1}/${i - paddingDays}/${year}`;

    if (i > paddingDays) {
      daySquare.innerText = i - paddingDays;
      const eventForDay = events.find((e) => e.date === dayString);

      if (i - paddingDays === day && nav === 0) {
        daySquare.id = "currentDay";
      }

      if (eventForDay) {
        const eventDiv = document.createElement("div");
        eventDiv.classList.add("event");

        daySquare.appendChild(eventDiv);
      }

      daySquare.addEventListener("click", () => openModal(dayString));
    } else {
      daySquare.classList.add("padding");
      daySquare.disab;
    }

    calendar.appendChild(daySquare);
  }
}

initButtons();
load();
populateList();

function openModal(date) {
  clicked = date;
  newEventModal.style.display = "block";
}

document
  .getElementById("eventLocationName")
  .addEventListener("input", () => addMap());
document
  .getElementById("eventCityInput")
  .addEventListener("input", () => addMap());
document
  .getElementById("eventCountryInput")
  .addEventListener("input", () => addMap());

function addMap() {
  if (locationName.value && city.value && country.value) {
    document.getElementById("map").style.display = "flex";
    let mapDiv = document.createElement("div");
    document.getElementById("map").appendChild.mapDiv;
  } else {
    document.getElementById("map").style.display = "none";
  }
  prepareAddressLink(locationName.value, city.value, country.value);
}

function closeModal() {
  eventTitleInput.classList.remove("error");

  locationName.classList.remove("error");
  city.classList.remove("error");
  country.classList.remove("error");
  meetingType.classList.remove("error");
  timePicker.classList.remove("error");

  newEventModal.style.display = "none";
  backDrop.style.display = "none";
  eventTitleInput.value = "";
  city.value = "";
  country.value = "";
  locationName.value = "";
  timePicker.value = "";
  document.getElementById("map").style.display = "none";

  load();
}

function prepareAddressLink(place_name, city, country) {
  const regex = /  +/g;
  place_name = place_name.replace(regex, "%20");
  city = city.replace(regex, "%20");
  country = country.replace(regex, "%20");

  addressLink =
    "https://maps.google.com/maps?q=" +
    place_name +
    "%20" +
    city +
    "%20" +
    country +
    "&t=&z=13&ie=UTF8&iwloc=&output=embed";
  document.getElementById("iframe_id").src = addressLink;
}

function saveEvent() {
  let count = 0;
  let today = new Date();
  today =
    today.getMonth() + 1 + "/" + today.getDate() + "/" + today.getFullYear();
  if (!eventTitleInput.value) {
    count++;
    eventTitleInput.classList.add("error");
  } else eventTitleInput.classList.remove("error");
  if (!locationName.value) {
    count++;
    locationName.classList.add("error");
  } else locationName.classList.remove("error");
  if (!city.value) {
    count++;
    city.classList.add("error");
  } else city.classList.remove("error");
  if (!country.value) {
    count++;
    country.classList.add("error");
  } else country.classList.remove("error");
  if (!meetingType.value) {
    count++;
    meetingType.classList.add("error");
  } else meetingType.classList.remove("error");
  if (!timePicker.value) {
    count++;
    timePicker.classList.add("error");
  } else timePicker.classList.remove("error");

  if (count < 1) {
    events.push({
      date: clicked,
      title: eventTitleInput.value,
      locationName: locationName.value,
      city: city.value,
      country: country.value,
      time: timePicker.value,
      type: currentMeeting.value,
    });
    // Save events object into the browser localStorage
    localStorage.setItem("events", JSON.stringify(events));

    //Check if meeting set is today to check duration
    if (today == clicked) {
      console.log("Meeting is today");
      timePickerValue = timePicker.value;
      getTimeDifference(timeToMins(timePickerValue));
      prepareAddress(locationName.value, city.value, country.value);
    }

  
    }
  
    
    closeModal();
    clearListItems();
    populateList();
    document.getElementById("map").style.display = "none";
  }


var CurrentEvent;

function deleteEvent() {
  let today = new Date();
  today =
    today.getMonth() + 1 + "/" + today.getDate() + "/" + today.getFullYear();

  if (today == CurrentEvent){
    console.log("DELETE TODAY");
    navigator.geolocation.clearWatch(watchId);
    clearInterval(interval);
    origin_coordinates = "";
    destination_coordinates = "";
    duration = 0;
    timePickerValue = "";
    timeDifference = 0;
  } 

  localStorage.removeItem(clicked);
  localStorage.setItem("events", JSON.stringify(events));
}

//Prepare address string into URL format --> 1
function prepareAddress(place_name, city, country) {
  const regex = /[ ]+/gm;
  place_name = place_name.replace(regex, "+");
  city = city.replace(regex, "+");
  country = country.replace(regex, "+");
  getCoordinates(place_name + "%2C" + city + "%2C" + country);
}

// Transform string address into coordinate pair --> 2
function getCoordinates(address) {
  let url =
    "https://geocode.search.hereapi.com/v1/geocode?q=" +
    address +
    "&apiKey=oTYNhKwC6MfaMys-TCZw9MAZHjPiOtrXmEdnZ8AqNm4";
  $.get(url, function (data, status) {
    let position = data["items"][0]["position"];
    let lattitude = position["lat"];
    let longitude = position["lng"];
    destination_coordinates = lattitude + "," + longitude;
    //getDuration(origin_coordinates, destination_coordinates);
    notifyMeeting();
  });
}

// ORIGIN is retreived from getLocation() func
// DESTINATION is retreived from getCoordinates() func
// --> 4
function getDuration(origin_coordinates, destination_coordinates) {
  console.log("IN GET DURATION");
  // Send destination addresss string for preparation then get corresponding coordinates.
  let url =
    "https://router.hereapi.com/v8/routes?transportMode=car&origin=" +
    origin_coordinates +
    "&destination=" +
    destination_coordinates +
    "&return=summary&apikey=oTYNhKwC6MfaMys-TCZw9MAZHjPiOtrXmEdnZ8AqNm4";

  $.get(url, function (data, status) {
    let calculatedDuration =
      data["routes"][0]["sections"][0]["summary"]["duration"];
    duration = Math.round(calculatedDuration / 60);
    console.log(duration + " min");
  });
}

//Adapter Pattern Implementation
class meeting {
  print() {
    console.log("general meeting");
  }

  alertNotification() {
    alert("you have a meeting");
  }
}

alertTiming = 10;

class onlineMeeting extends meeting {
  print() {
    console.log("online meeting");
  }
  alertNotification() {
    alert(
      "you have an online meeting in  " +
        (duration+10) +
        " min. So get Comfortable!!"
    );
  }
}

class liveMetting extends meeting {
  print() {
    console.log("live meeting");
  }
  alertNotification() {
    alert(
      "You have a meeting in  " +
        (duration +10)+
        " min. So get ready to move in " +
        "10 min"
    );
  }
}

class personalMeeting extends meeting {
  print() {
    console.log("personal meeting");
  }

  alertNotification() {
    alert(
      "You have a personal appointment in  " +
        (duration+10) +
        " min.  So get ready to move in " +
        "10 min. Drive Safe and Have Fun!"
    );
  }
}

class exam extends meeting {
  print() {
    console.log("exam");
  }

  alertNotification() {
    alert(
      "You have an exam in " +
        (duration+10) +
        " min.  So get ready to move in " +
        "  10 min. Best of Luck!"
    );
  }
}

class other extends meeting {
  print() {
    super.print();
  }
  alertNotification() {
    super.alertNotification();
  }
}

function getMeeting() {
  let currentMeeting = document.getElementById("types").value;

  console.log(currentMeeting);
  if (currentMeeting == "online") {
    meetingPoly = new onlineMeeting();
    meetingPoly.print();
    meetingPoly.alertNotification();
  }

  if (currentMeeting == "live") {
    meetingPoly = new liveMetting();
    meetingPoly.print();
    meetingPoly.alertNotification();
  }

  if (currentMeeting == "exam") {
    meetingPoly = new exam();
    meetingPoly.print();
    meetingPoly.alertNotification();
  }

  if (currentMeeting == "personal") {
    meetingPoly = new personalMeeting();
    meetingPoly.print();
    meetingPoly.alertNotification();
  }

  if (currentMeeting == "other") {
    meetingPoly = new other();
    meetingPoly.print();
    meetingPoly.alertNotification();
  }
}

// --> 3
// Function that activates watchPosition and Interval for duration and time difference.
function notifyMeeting() {
  if (timeDifference - duration - 10 == 0) {
    alert("Leave in 10 min!!");
  } else {
    watchId = navigator.geolocation.watchPosition((position) => {
      console.log("Watching Position");
      origin_coordinates =
        position.coords.latitude + "," + position.coords.longitude;
      console.log(origin_coordinates);
    });

    interval = setInterval(() => {
      getDuration(origin_coordinates, destination_coordinates);
      getTimeDifference(timeToMins(timePickerValue));

      if (timeDifference - duration - 10 == 0) {
        console.log("Clearing Watch");
        getMeeting();
        navigator.geolocation.clearWatch(watchId);
        clearInterval(interval);
      }
    }, 10000);
  }
}

// Convert time from "HH:MM" to total minutes
function timeToMins(time) {
  let splitTime = time.split(":");

  return splitTime[0] * 60 + parseInt(splitTime[1]);
}

// Find difference between chosen time and current time in minutes --> 5
function getTimeDifference(chosenTime) {
  let currentTime = new Date();
  currentTime = timeToMins(
    currentTime.getHours() + ":" + currentTime.getMinutes()
  );

  if (chosenTime > currentTime) {
    timeDifference = chosenTime - currentTime;

    console.log("Time Difference: " + timeDifference);
  } else {
    console.log("Time already passed");
    navigator.geolocation.clearWatch(watchId);
    clearInterval(interval);
  }
}

function removeItem(id) {
  var item = document.getElementById(id);
  eventList.removeChild(item);
}

function populateList() {
  if (events.length != 0) {
    for (let i = 0; i < events.length; i++) {
      let li = document.createElement("li");
      li.setAttribute("id", events[i].date);
      li.className = "list-item";

      let listDiv = document.createElement("div");
      listDiv.className = "text-div";

      let title = document.createElement("p");
      title.innerHTML = events[i].title;
      listDiv.appendChild(title);

      let date = document.createElement("p");
      date.innerHTML = events[i].date;
      listDiv.appendChild(date);

      let time = document.createElement("p");
      time.innerHTML = events[i].time;
      listDiv.appendChild(time); 

      li.appendChild(listDiv);

      let deleteBtn = document.createElement("div");
      deleteBtn.setAttribute("id", events[i].date);
      deleteBtn.className = "list-btn";
    

      deleteBtn.onclick = (e) => {
        // Removes event from event summary
        CurrentEvent = e.target.id;
        console.log(CurrentEvent);
        deleteEventfromList(e.target.id);

        // Delete event from calendar and storage
        deleteEvent();

        // Refresh Calendar
        load();
      };
      li.appendChild(deleteBtn);

      eventList.appendChild(li);
    }
  }
}

function deleteEventfromList(id) {
  events = events.filter((e) => e.date !== id);
  removeItem(id);
}

// Function to remove list children before updating
function clearListItems() {
  let listItems = "";
  while ((listItems = eventList.getElementsByTagName("li")).length > 0) {
    eventList.removeChild(listItems[0]);
  }
}
