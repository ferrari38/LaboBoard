// Initialize Firebase
var config = {
    apiKey: "AIzaSyBQXKD8V_-Ex-EkoeSYHrgBc6kFVp4NaAg",
    authDomain: "laboboard.firebaseapp.com",
    databaseURL: "https://laboboard.firebaseio.com",
    projectId: "laboboard",
    storageBucket: "laboboard.appspot.com",
    messagingSenderId: "740359907841"
};


firebase.initializeApp(config);
var database = firebase.database();
var dataRef = database.ref('/member');
dataRef.once("value").then(function(snapshot) {
    document.getElementById("t_Ohzawa").textContent = snapshot.child("Ohzawa/state").val();
    document.getElementById("t_Kodama").textContent = snapshot.child("Kodama/state").val();
    document.getElementById("t_Higuchi").textContent = snapshot.child("Higuchi/state").val();

    document.getElementById("q_Ohzawa").textContent = snapshot.child("Ohzawa/count").val();
    document.getElementById("q_Kodama").textContent = snapshot.child("Kodama/count").val();
    document.getElementById("q_Higuchi").textContent = snapshot.child("Higuchi/count").val();

    time_Ohzawa=snapshot.child("Ohzawa/time").val();
    time_Kodama=snapshot.child("Kodama/time").val();
    time_Higuchi=snapshot.child("Higuchi/time").val();

    time_Ohzawa=calcDuration(time_Ohzawa);
    time_Kodama=calcDuration(time_Kodama);
    time_Higuchi=calcDuration(time_Higuchi);

    document.getElementById("d_Ohzawa").textContent = time_Ohzawa;
    document.getElementById("d_Kodama").textContent = time_Kodama;
    document.getElementById("d_Higuchi").textContent = time_Higuchi;
});

function calcDuration(ms){
    var h = String(Math.floor(ms / 3600000) + 100).substring(1);
    var m = String(Math.floor((ms - h * 3600000)/60000)+ 100).substring(1);
    var s = String(Math.round((ms - h * 3600000 - m * 60000)/1000)+ 100).substring(1);
    return h+'時間'+m+'分'+s+'秒';
}

function timeUpdate() {
    dataRef.once("value").then(function(snapshot) {

        document.getElementById("q_Ohzawa").textContent = snapshot.child("Ohzawa/count").val();
        document.getElementById("q_Kodama").textContent = snapshot.child("Kodama/count").val();
        document.getElementById("q_Higuchi").textContent = snapshot.child("Higuchi/count").val();

        time_Ohzawa=snapshot.child("Ohzawa/time").val();
        time_Kodama=snapshot.child("Kodama/time").val();
        time_Higuchi=snapshot.child("Higuchi/time").val();

        time_Ohzawa=calcDuration(time_Ohzawa);
        time_Kodama=calcDuration(time_Kodama);
        time_Higuchi=calcDuration(time_Higuchi);

        document.getElementById("d_Ohzawa").textContent = time_Ohzawa;
        document.getElementById("d_Kodama").textContent = time_Kodama;
        document.getElementById("d_Higuchi").textContent = time_Higuchi;

    });
}