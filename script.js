$(document).ready(function () {
    $('ul.tabs').tabs();
});


var usernames = ["ESL_SC2", "OgamingSC2", "riotgames", "freecodecamp", "syndicate", "Datto", "Warcraft", "Sing_sing", "Zizaran"];
var URL_streams = 'https://wind-bow.gomix.me/twitch-api/streams/';
var callback = '?callback=jsonData';
var URL;

//VanillaJS JSONP call
function getJSONP() {
    var script = document.createElement('script');

    script.type = 'text/javascript';

    script.src = URL;

    document.getElementsByTagName('head')[0].appendChild(script);
}


//Get the currently streaming channels
usernames.forEach(function (user) {
    URL = URL_streams + user + callback;

    getJSONP();
});

//Callback function for the API call
function jsonData(data) {
    console.log(data);

    var userName = data._links.self.substring(37);
    var offLink = 'https://www.twitch.tv/' + userName; 
    var streamStatus = data.stream;
    var cardOn, cardOff;
    
    
    if (streamStatus === null) {

        cardOff = '<div class="col s12 m6 l4"><div class="card horizontal z-depth-1 fadeIn"><div class="row valign-wrapper"><div class="col s3"><img class="circle responsive-img off" src="images/twitch-icon.png"></div><div class="col s9"><div class="card-stacked"><div class="card-content"><p class="names">' + userName + '<span class="stat offline">Offline </span></p><br><p class="stream">Currently not streaming...</p></div><div class="card-action links"><a href="' + offLink + '" target="_blank">Go to my channel</a></div></div></div></div></div></div>';
        
        document.getElementById('all-tab').innerHTML += cardOff;
        document.getElementById('offline-tab').innerHTML += cardOff;

    } else if (streamStatus !== null) {
        
        var status = data.stream.channel.status;
        
        if (status.length > 20) {
            status = data.stream.channel.status.substring(0, 30) + '...';
        } else {
            status = data.stream.channel.status;
        }
        
        cardOn = '<div class="col s12 m6 l4"><div class="card horizontal z-depth-1 fadeIn"><div class="row valign-wrapper"><div class="col s3"><img class="circle responsive-img on" src="' + data.stream.channel.logo + '"></div><div class="col s9"><div class="card-stacked"><div class="card-content"><p class="names">' + data.stream.channel.display_name + '<span class="stat online">Online <a href="#" class="btn btn-floating pulse"></a></span></p><br><p class="stream">' + status + '</p><p class="game">Playing: ' + data.stream.channel.game + '</p></div><div class="card-action links"><a href="' + data.stream.channel.url + '" target="_blank">Go to my channel</a></div></div></div></div></div></div>';
        
        document.getElementById('all-tab').innerHTML += cardOn;
        document.getElementById('online-tab').innerHTML += cardOn;
    
    }  
    
}



