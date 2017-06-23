// FIREBASE 
var config = {
    apiKey: "AIzaSyBlaf1ST7wUoySRa8Wf6kKP8kf53G2r2KY",
    authDomain: "first-project-ccf72.firebaseapp.com",
    databaseURL: "https://first-project-ccf72.firebaseio.com",
    projectId: "first-project-ccf72",
    storageBucket: "first-project-ccf72.appspot.com",
    messagingSenderId: "850034355384"
};

firebase.initializeApp(config);

var database = firebase.database();
var data;

// Firebase Pull New Data 
database.ref().on("value", function(snapshot) {

    // Collect Firebase Data 
    data = snapshot.val();

    // Update DOM 
    refreshTable();
});

// Submit 
$("#addTrain").on('click', function() {

    // COLLECT VALUES to HTML 
    var name = $("#name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var trainFirstArrivalTime = $("#first-input").val().trim();
    var trainFreq = $("#frequency-input").val().trim();

    // Alerts
    if (name == "") {
        alert("Please enter a Train Name!");
        return false;
    }
    if (destination == "") {
        alert("Please enter a Train Destination!");
        return false;
    }
    if (trainFirstArrivalTime == "") {
        alert("Please enter a First Arrival Time!");
        return false;
    }
    if (trainFreq == "" || trainFreq < 1) {
        alert("Please enter an arrival frequency (in minutes) greater than zero.");
        return false;
    }


    // Time Variables 
    var today = new Date();
    var thisMonth = today.getMonth() + 1;
    var thisDate = today.getDate();
    var thisYear = today.getFullYear();

    //Redueced to Excel spreadsheet tricksDATE STRING 
    var dateString = "";
    var dateString = dateString.concat(thisMonth, "/", thisDate, "/", thisYear);

    // DATE & TIME STORAGE 
    var trainFirstArrival = dateString.concat(" ", trainFirstArrivalTime);

    // Push to firebase 
    database.ref().push({
        name: name,
        destination: destination,
        firstArrival: trainFirstArrival,
        frequency: trainFreq
    });

    // Reset Inputs 
    $("#name-input").val("");
    $("#destination-input").val("");
    $("#first-input").val("");
    $("#frequency-input").val("");

    // Prevent Default Refresh 
    return false;
});

// Update Table
function refreshTable() {

    // Clear Old Data 
    $('.table-body-row').empty();

    // FIREBASE to HTML 
    $.each(data, function(key, value) {

        //Start of Moment.js Calculations
        var name = value.name;
        var destination = value.destination;
        var trainFreq = value.frequency;
        var trainFirstArrivalTime = value.firstArrival;
        var trainNextDeparture;
        var trainMinutesAway;

        //Convert
        var convertedDate = moment(new Date(trainFirstArrivalTime));

        //Minutes away
        var minuteDiffFirstArrivalToNow = moment(convertedDate).diff(moment(), "minutes") * (-1);

        // Look for New Train Times 
        if (minuteDiffFirstArrivalToNow <= 0) {

            // Current Departure 
            trainMinutesAway = moment(convertedDate).diff(moment(), "minutes");

            // Next Depature Time 
            trainNextDepartureDate = convertedDate;
        } else {

            // Next Train Departure 
            trainMinutesAway = trainFreq - (minuteDiffFirstArrivalToNow % trainFreq);

            // Next Departure Time 
            var trainNextDepartureDate = moment().add(trainMinutesAway, 'minutes');
        }

        // Formattin
        trainNextDeparture = trainNextDepartureDate.format("hh:mm A");

        // APPEND HTML w/ FIREBASE 
        var newRow = $('<tr>');
        newRow.addClass("table-body-row");

        // NEW DATA from FIREBASE 
        var nameTd = $('<td>');
        var destinationTd = $('<td>');
        var frequencyTd = $('<td>');
        var nextDepartureTd = $('<td>');
        var minutesAwayTd = $('<td>');

        // Data Text to HTML 
        nameTd.text(name);
        destinationTd.text(destination);
        frequencyTd.text(trainFreq);
        nextDepartureTd.text(trainNextDeparture);
        minutesAwayTd.text(trainMinutesAway);

        // New Row Data Text to HTML 

        newRow.append(nameTd);
        newRow.append(destinationTd);
        newRow.append(frequencyTd);
        newRow.append(nextDepartureTd);
        newRow.append(minutesAwayTd);

        // New Row to HTML 
        $('.table').append(newRow);

    });
}

// Refresh -- addin extra row??!!

//var counter = setInterval(refreshTable, 60*1000);
// Update the Current Time every second
var timeStep = setInterval(currentTime, 1000);

function currentTime() {
    var timeNow = moment().format("hh:mm:ss A");
    //$("#current-time").text(timeNow);

    // Refresh the Page every minute, on the minute
    var secondsNow = moment().format("ss");

    if (secondsNow == "00") {
        refreshTable();
    }

}

const HOURHAND = document.querySelector("#hour");
const MINUTEHAND = document.querySelector("#minute");
const SECONDHAND = document.querySelector("#second");

var date = new Date();
console.log(date);
let hr = date.getHours();
let min = date.getMinutes();
let sec = date.getSeconds();
console.log("Hour: " + hr + " Minute: " + min + " Second: " + sec);

let hrPosition = (hr*360/12)+(min*(360/60)/12);
let minPosition = (min*360/60)+(sec*(360/60)/60);
let secPosition = sec*360/60;

function runTheClock() {

    hrPosition = hrPosition+(3/360);
    minPosition = minPosition+(6/60);
    secPosition = secPosition+6;

    HOURHAND.style.transform = "rotate(" + hrPosition + "deg)";
    MINUTEHAND.style.transform = "rotate(" + minPosition + "deg)";
    SECONDHAND.style.transform = "rotate(" + secPosition + "deg)";

}

var interval = setInterval(runTheClock, 1000);

