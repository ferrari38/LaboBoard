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

});

function stateUpdate(state_) {
    var member_ = document.getElementById('selectName').value;
    var pw_ = document.getElementById('pw').value;

    database.ref('/member').once("value").then(function(snapshot) {
        var s = snapshot.child(member_ + "/state").val();
        var t = snapshot.child(member_ + "/time").val();
        var pt = snapshot.child(member_ + "/ptime").val();
        var c = snapshot.child(member_ + "/count").val();
        if(s == state_) {
            alert(s + "しています");
        }
        else {
            if(pw_ =='0000') {
                var time_ = new Date();
                time_ = time_.getTime();
                if(state_ == '入室') {
                    c = c + 1;
                }
                if(state_ == '退室') {
                    t += time_ - pt;
                }

                firebase.database().ref('member/' + member_).set({
                    count: c, //Labo訪問回数
                    time: t, //Labo滞在時間
                    ptime: time_, //前回入退室時間
                    state: state_ //現在の状態
                });

                alert("SUCCESS");
            }
             else {
                alert("パスワードが違います");
            }
        }
    });
}