$(document).ready(function(){

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCIgcHAhHkdYBWFvQhPv2mCIxLTAifhYzA",
        authDomain: "mynewproject-e137f.firebaseapp.com",
        databaseURL: "https://mynewproject-e137f.firebaseio.com",
        projectId: "mynewproject-e137f",
        storageBucket: "mynewproject-e137f.appspot.com",
        messagingSenderId: "828235078609"
    };
    
    firebase.initializeApp(config);

    let database = firebase.database();

    // Button for Adding a Train
    $("addTrain").on("click", function (event) {
        event.preventDefault();

        // Grab user input
        let trainName = $("#trainName").val().trim();
        let destination = $("#destination").val().trim();
        let firstTrain = $("#firstTrain").val().trim();
        let frequency = $("#interval").val().trim();

        // Creates local "temporary" object for holding train data
        // let newTrain = {
        //     name: trainName,
        //     dest: destination,
        //     first: firstTrain,
        //     freq: frequency
        // };

        // Uploads train data to Firebase
        // database.ref().push(newTrain);
        database.ref().push({
            trainName: trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency
        });

        // Logs everything to the console from Firebase
        // console.log(newTrain.name);
        // console.log(newTrain.dest);
        // console.log(newTrain.first);
        // console.log(newTrain.freq);

        // Clears all the text boxes
        // $("trainName").val("");
        // $("destination").val("");
        // $("firstTrain").val("");
        // $("#interval").val("");
    });

    // Create event for adding a train to the table
    database.ref().on("child_added", function(childSnapshot) {
        console.log(childSnapshot.val());

        let newTrain = childSnapshot.val().trainName;
        let newLocation = childSnapshot.val().destination;
        let newFirstTrain = childSnapshot.val().firstTrain;
        let newFreq = childSnapshot.val().frequency;

        let startTimeConverted = moment(newFirstTrain, "hh:mm").subtract(1, "years");

        let diffTime = moment().diff(moment(startTimeConverted), "minutes");

        let tRemainder = diffTime % newFreq;

        let tMinutesTillTrain = newFreq - tRemainder;

        let nextTrain = moment().add(tMinutesTillTrain, "minutes");
        let catchTrain = moment(nextTrain).format("HH:mm");

        $("#all-display").append("<tr><td>" + newTrain + "</td><<td>" + newLocation + "</td><td>" + newFreq + "</td><td>" + catchTrain + "</td><td>" + tMinutesTillTrain + "</td></tr>");

        $("#trainName").val("");
        $("#destination").val("");
        $("#firstTrain").val("");
        $("#interval").val("");
        return false;
    },
    function(errorObject) {
        console.log("Errors: " + errorObject.code);
    });

});