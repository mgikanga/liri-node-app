
// get access to the keys using dotenv
var inputString = process.argv;
require("dotenv").config();
// import keys from the keys.js
var keys = require("./keys.js")
var Twitter = require('twitter');
var Spotify = require('node-spotify-api')
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

//function for twitter to display 20 tweets
 function myTweets(){
     // variable to store my parameters
var params = {screen_name: 'nodejs',count: 20};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
   
  if (!error) {
      //display the whole tweet body from the response
    //console.log(tweets);
    //return only the tweets and time created by disecting the tweets
    var all = tweets;
    for(var i = 0; i< all.length; i++){
        console.log("\nMessage: " +all[i].text + "\nTime: "  + all[i].created_at)
    }
  }
  //display error if it occurs
  console.log(error);
});
 };


 //function that for spotify 
 function mySongs(){
     // variable for when user search for song
     var song = inputString[3];
     //search by track parameter
     if( inputString[3] === undefined ){
         song = "Wanted"
     }
    
 spotify.search({ type: 'track', query: song })
  .then(function(response) {
    //display the whole data
    //console.log(response.tracks.items[0]);
    // recover the track artists name preview link and album by discecting the response
    var alb = response.tracks.items[0].artists;
    for(var i = 0; i< alb.length; i++){
        console.log("Artist:" +alb[i].name)
    }
    console.log("Name: "+response.tracks.items[0].name +"\nPreview link: "+response.tracks.items[0]. preview_url + "\nAlbum: "+response.tracks.items[0].album.album_type);
    
  })
  //display error if any
  .catch(function(err) {
    console.log(err);
  });
}


// function to display movies
function myMovie(){
    // include the request npm package
    var request = require("request");


// Then run a request to the OMDB API with the movie 
var query = "http://www.omdbapi.com/?t="
// get the movie from the user
var movie = inputString[3];
// when user doesn't input anything
if( inputString[3] === undefined ){
    movie = "Mr.Nobody"
}

var key = "&y=&plot=short&apikey=trilogy"
var mQuery = query+ movie+ key;
request(mQuery, function(error, response, body) {

  // If the request is successful (i.e. if the response status code is 200)
  if (!error && response.statusCode === 200) {
      //display the whole body so that you can view the details
    //console.log(body)
    // Parse the body of the site and recover just the required details
 
    console.log("Title : " +JSON.parse(body).Title + "\nYear: " +JSON.parse(body).Year +"\nIMDBRating: "+ JSON.parse(body).imdbRating +"\nRating: " + 
    JSON.parse(body).Ratings  + "\nCountry: " + JSON.parse(body).Country + "\nLanguage: " +JSON.parse(body).Language + "\nPlot: " + JSON.parse(body).Plot +
"\nActors: " + JSON.parse(body).Actors);

  }
});
}


// node commands
var inputString = process.argv;
var command = inputString[2];
// command to display tweets
if (command === 'my-tweets'){
    myTweets();
} 
//command to display song name, artist, album and preview link
else if( command === 'spotify-this-song'){
mySongs();
}
else if( command === 'movie-this'){
myMovie();
}