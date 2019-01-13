$(document).ready(function(){

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyArYjAMHyG9deA4dQ7N9qOew41zreoL3Bk",
        authDomain: "trainscheduler-e1490.firebaseapp.com",
        databaseURL: "https://trainscheduler-e1490.firebaseio.com",
        projectId: "trainscheduler-e1490",
        storageBucket: "trainscheduler-e1490.appspot.com",
        messagingSenderId: "64359160830"
    };

    firebase.initializeApp(config);

    let database = firebase.database();

    // Button for Adding a Train
    $("#addTrain").on("click", function(event) {
        event.preventDefault();

        console.log("Hello World");

        // Grab user input
        let trainName = $("#trainName").val().trim();
        let destination = $("#destination").val().trim();
        let firstTrain = $("#firstTrain").val().trim();
        let frequency = $("#interval").val().trim();

        // Creates local "temporary" object for holding train data
        let newTrain = {
            name: trainName,
            dest: destination,
            first: firstTrain,
            freq: frequency
        };

        // Uploads train data to Firebase
        database.ref().push(newTrain);

        // Logs everything to the console from Firebase
        console.log(newTrain.name);
        console.log(newTrain.dest);
        console.log(newTrain.first);
        console.log(newTrain.freq);

        // Clears all the text boxes
        $("trainName").val("");
        $("destination").val("");
        $("firstTrain").val("");
        $("#interval").val("");
    });

    // Create event for adding a train to the table
    database.ref().on("child_added", function(childSnapshot) {
        console.log(childSnapshot.val());

        // Store everything into a variable
        let trainName = childSnapshot.val().name;
        let destination = childSnapshot.val().dest;
        let firstTrain = childSnapshot.val().first;
        let frequency = childSnapshot.val().freq;

        // Train information
        console.log(trainName);
        console.log(destination);
        console.log(firstTrain);
        console.log(frequency);

        let startTimeConverted = moment(firstTrain, "hh:mm").subtract(1, "years");

        let diffTime = moment().diff(moment(startTimeConverted), "minutes");

        let tRemainder = diffTime % frequency;

        let tMinutesTillTrain = frequency - tRemainder;

        let nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm");

        let newRow = $("<tr>").append(
            $("<td>").text(trainName),
            $("<td>").text(destination),
            $("<td>").text(frequency),
            $("<td>").text(nextTrain),
            $("<td>").text(tMinutesTillTrain)
        );
            
        $("#table-row").append(newRow);

        $("trainName").val("");
        $("destination").val("");
        $("firstTrain").val("");
        $("#interval").val("");
    });

});