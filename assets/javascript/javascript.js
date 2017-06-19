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
var start = 0;
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
    start = moment($("#start-input").val().trim(), "HH:mm").subtract(10, "years").format("X");
    frequency = $("#frequency-input").val().trim();

    // send to database == push
    dataRef.ref().push({

        name: name,
        destination: destination,
        start: start,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
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

    var mfrequency = childSnapshot.val().frequency

    var nextTrain = childSnapshot.val().start

    var timeDifference = moment().diff(moment.unix(nextTrain), "minutes");

    var remainingTime = moment().diff(moment.unix(nextTrain), "minutes") % mfrequency;

    var timeMinutes = mfrequency - remainingTime;

    var arrivalTime = moment().add(timeMinutes, "m").format("hh:mm A");
    
    console.log(frequency)
    console.log(nextTrain)
    console.log(timeDifference)
    console.log(remainingTime)
    console.log(moment().format("hh:mm A"))
    console.log(timeDifference);
    console.log(moment().format("X"))
    console.log(remainingTime)
    console.log(timeMinutes)
    console.log(moment().format("hh:mm A"))
    console.log(arrivalTime);
    console.log(moment().format("X"))


    // display-trainName
    // display-trainDestination
    // display-trainDeparture
    // display-trainFrequency
    $("#trainList").append("<div class='well'><div id='name'> " + childSnapshot.val().name +
        " </div><div id='destination'> " + "Destination " + childSnapshot.val().destination +
        " </div><div id='frequency'> " + "runs every " + childSnapshot.val().frequency + " minutes" +
        " </div><div id='start'> " + "Arriving in  " + timeMinutes + " minutes" +
        " </div><div id='dateAdded'> " + "At  " + arrivalTime + " </div></div>");

    // Handle the errors
}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
    // Change the HTML to reflect
    $("#name-display").html(snapshot.val().name);
    $("#destination-display").html(snapshot.val().destination);
    $("#start-display").html(snapshot.val().start);
    $("#frequency-display").html(snapshot.val().frequency);

});

//set current time if analog clock wont work
// function displayTime() {
//     //var time = moment().format('hh:mm:ss a');
//     var timeNow = moment().format('h:mm:ss a');
//     $('.time').html("Apparently it's:  " + timeNow);
//     setTimeout(displayTime, 1000);
// };
//  displayTime();

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

