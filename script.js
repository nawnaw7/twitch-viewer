$(document).ready(function () {
    $('ul.tabs').tabs();
});


var usernames = ["ESL_SC2", "OgamingSC2", "riotgames", "freecodecamp", "syndicate", "habathcx", "Warcraft", "KingGothalion", "nightblue3"];
var URL_streams = 'https://wind-bow.gomix.me/twitch-api/';
var callbackFunc_1 = '?callback=jsonData_1';
var callbackFunc_2 = '?callback=jsonData_2';
var URL;

function getJSONP_1() {
    var script = document.createElement('script');

    script.type = 'text/javascript';

    script.src = URL;

    document.getElementsByTagName('head')[0].appendChild(script);
}

function getJSONP_2() {
    var script = document.createElement('script');

    script.type = 'text/javascript';

    script.src = URL;

    document.getElementsByTagName('head')[0].appendChild(script);
}

//Get the currently streaming channels
usernames.forEach(function (user) {
    URL = URL_streams + 'streams/' + user + callbackFunc_1;

    getJSONP_1();
});

//Get channel extended information
usernames.forEach(function (user) {
    URL = URL_streams + 'channels/' + user + callbackFunc_2;

    getJSONP_2();
});



function jsonData_1(data2) {
    console.log(data2);

    var statusArr = [];
    var online = false;
    var userName = data2._links.self.substring(37);

    if (data2.stream != null) {
        online = true;
        console.log('Channel: ' + userName + ' is online.');

    } else {
        online = false;
        console.log('Channel: ' + userName + ' is offline.');
    }


}



function jsonData_2(data) {

    //console.log(data);

    var logo = data.logo;
    var channel = data.display_name;
    var status = data.status;
    var links = data.url;

    var cardOn = '<div class="col s12 m6 l4"><div class="card horizontal z-depth-1"><div class="row valign-wrapper"><div class="col s3"><img class="circle responsive-img on" src="' + logo + '"></div><div class="col s9"><div class="card-stacked"><div class="card-content"><p class="names">' + channel + '<span class="stat online">Online <a href="#" class="btn btn-floating pulse"></a></span></p><br><p class="stream">' + status + '</p></div><div class="card-action links"><a href="' + links + '" target="_blank">Go to my channel</a></div></div></div></div></div></div>';

    var cardOff = '<div class="col s12 m6 l4"><div class="card horizontal z-depth-1"><div class="row valign-wrapper"><div class="col s3"><img class="circle responsive-img off" src="' + logo + '"></div><div class="col s9"><div class="card-stacked"><div class="card-content"><p class="names">' + channel + '<span class="stat offline">Offline </span></p><br><p class="stream">' + status + '</p></div><div class="card-action links"><a href="' + links + '" target="_blank">Go to my channel</a></div></div></div></div></div></div>';

    document.getElementById('all-tab').innerHTML += cardOn;


}
