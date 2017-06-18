//Starting variables
//Letter choices available
// $(function () {

// access initailize firebase

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



// // onclick function to send grab data from form
$("#addTrain").on("click", function(event) {
    event.preventDefault();


    // input-trainName
    // input-trainDestination
    // input-trainDeparture
    // input-trainFrequency
    name = $("#name-input").val().trim();
    destination = $("#destination-input").val().trim();
    start = $("#start-input").val().trim();
    frequency = $("#frequency-input").val().trim();

    // send to database == push
    dataRef.ref().push({

        name: name,
        destination: destination,
        start: start,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
});

// update/snapshot function
dataRef.ref().on("child_added", function(childSnapshot) {


    // display-trainName
    // display-trainDestination
    // display-trainDeparture
    // display-trainFrequency

    $("#trainList").append("<div class='well'><div id='name'> " + childSnapshot.val().name +
        " </div><div id='destination'> " + childSnapshot.val().destination +
        " </div><div id='frequency'> " + childSnapshot.val().frequency +
        " </div><div id='start'> " + childSnapshot.val().start +
        " <div id='dateAdded'> " + childSnapshot.val().dateAdded + " </div></div>");


    // Handle the errors
}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});




// clear form  
// return false or default...


// Time functions moment.js

// grab reat time and diplay
// calculate departure times from start + frequesncy
// caluclate (next departure time - real time == remaining minutes to next train)





// display- calutation of time till next departure

//});
