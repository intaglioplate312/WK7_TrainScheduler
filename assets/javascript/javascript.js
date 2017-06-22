// Initialize Firebase
var config = {
    apiKey: "AIzaSyBlaf1ST7wUoySRa8Wf6kKP8kf53G2r2KY",
    authDomain: "first-project-ccf72.firebaseapp.com",
    databaseURL: "https://first-project-ccf72.firebaseio.com",
    projectId: "first-project-ccf72",
    storageBucket: "first-project-ccf72.appspot.com",
    messagingSenderId: "850034355384"
};

// config firebase
// == firebase.database
firebase.initializeApp(config);

var dataRef = firebase.database();

// Initial Values
var name = "";
var destination = "";
var start = "";
var frequency = "";


// // onclick function to send grab data from form
$("#addTrain").on("click", function(event) {
    event.preventDefault();


    // input-trainName
    // input-trainDestination
    // input-trainDeparture
    // input-trainFrequency
    name = $("#name-input").val().trim();
    destination = $("#destination-input").val().trim();
    frequency = $("#frequency-input").val().trim();
    start = $("#start-input").val().trim();


    if (name == "") {
        alert("Please enter a Train Name!");
        return false;
    }
    if (destination == "") {
        alert("Please enter a Train Destination!");
        return false;
    }
    //not working 
    if (start.length === 4) {
        alert("Please enter a First Arrival Time!");
        return false;
    }
    if (frequency == "" || frequency < 1) {
        alert("Please enter an arrival frequency (in minutes)!" + "\n" + "It must be an integer greater than zero.");
        return false;
    }


    // send to database == push
    dataRef.ref().push({

        name: name,
        destination: destination,
        start: start,
        frequency: frequency,

    });



    //clear inputs
    $("#name-input").val("");
    $("#destination-input").val("");
    $("#start-input").val("");
    $("#frequency-input").val("");
    return false;
});

// update/snapshot function
dataRef.ref().on("child_added", function(childSnapshot) {

    //waited for Panotop video, but never uploaded
    //timer differentials ( not ready for prime time!!)
    console.log(childSnapshot.val());

    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().destination;
    var trainfrequency = childSnapshot.val().frequency;
    var nextTrain = childSnapshot.val().start;

    // convert train time
    var nextTrainConverted = moment(nextTrain, "HH:mm").subtract(1, "years");

    // current time
    var currentTime = moment();

    // time dfference
    var timeDifference = moment().diff(moment(nextTrainConverted), "minutes");

    // time between
    //var remainingTime = moment().diff(moment.unix(nextTrain), "minutes") % trainfrequency;
    var remainingTime = timeDifference % trainfrequency;

    // minutes to next train
    var timeMinutes = trainfrequency - remainingTime;

    // next train arriving
    var arrivalTime = moment().add(timeMinutes, "minutes");




    // display-trainName
    // display-trainDestination
    // display-trainDeparture
    // display-trainFrequency
    $("#trainList").append("<div class='well'><div id='name'> " + trainName +
        " </div><div id='destination'> " + "Destination " + trainDest +
        " </div><div id='frequency'> " + "runs every " + trainfrequency + " minutes" +
        " </div><div id='start'> " + "Arriving in  " + timeMinutes + " minutes" +
        " </div><div id='dateAdded'> " + "At  " + moment(arrivalTime).format("hh:mm a") + " </div></div>");

    //" </div><div id='dateAdded'> " + "At  " + arrivalTime + " </div></div>");

    // Handle the errors
}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

// dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(lastEmpSnapshot) {
//     // Change the HTML to reflect
//     $("#name-display").html(snapshot.val().name);
//     $("#destination-display").html(snapshot.val().destination);
//     $("#start-display").html(snapshot.val().start);
//     $("#frequency-display").html(snapshot.val().frequency);

// });



const HOURHAND = document.querySelector("#hour");
const MINUTEHAND = document.querySelector("#minute");
const SECONDHAND = document.querySelector("#second");

var date = new Date();
console.log(date);
let hr = date.getHours();
let min = date.getMinutes();
let sec = date.getSeconds();
console.log("Hour: " + hr + " Minute: " + min + " Second: " + sec);

let hrPosition = (hr * 360 / 12) + (min * (360 / 60) / 12);
let minPosition = (min * 360 / 60) + (sec * (360 / 60) / 60);
let secPosition = sec * 360 / 60;

function runTheClock() {

    hrPosition = hrPosition + (3 / 360);
    minPosition = minPosition + (6 / 60);
    secPosition = secPosition + 6;

    HOURHAND.style.transform = "rotate(" + hrPosition + "deg)";
    MINUTEHAND.style.transform = "rotate(" + minPosition + "deg)";
    SECONDHAND.style.transform = "rotate(" + secPosition + "deg)";

}

var interval = setInterval(runTheClock, 1000);
