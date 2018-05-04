
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
function myTweets() {
    // variable to store my parameters
    var params = { screen_name: 'Janet Garcia', count: 20 };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {

        if (!error) {
            //display the whole tweet body from the response
            //console.log(tweets);
            //return only the tweets and time created by disecting the tweets
            var all = tweets;
            for (var i = 0; i < all.length; i++) {
                var output = "\nMessage: " + all[i].text + "\nTime: " + all[i].created_at;
                console.log(output);
                //write the output in the log.txt file
             var fs = require("fs");

             // This block of code will create a file called "movies.txt".
             // It will then print "Inception, Die Hard" in the file
             fs.writeFile("log.txt", output, function(err) {
             
               // If the code experiences any errors it will log the error to the console.
               if (err) {
                 return console.log(err);
               }
             
               // Otherwise, it will print: "log.txt was updated!"
               console.log("log.txt was updated!");
             
             });
             

            }
        }
        //display error if it occurs
        console.log(error);
    });
};


//function that for spotify 
function mySongs() {
    // variable for when user search for song
    // set it as the second user input
    var song = inputString[3];
    //search by track parameter
    if (inputString[3] === undefined) {
        song = "Started From The Bottom"
    }

    spotify.search({ type: 'track', query: song })
        .then(function (response) {
            //display the whole data
            //console.log(response.tracks.items[0]);
            // recover the track artists name preview link and album by discecting the response
            var alb = response.tracks.items[0].artists;
            for (var i = 0; i < alb.length; i++) {
                console.log("Artist:" + alb[i].name)
            }
            var output = "Name: " + response.tracks.items[0].name + "\nPreview link: " + response.tracks.items[0].preview_url + "\nAlbum: " + response.tracks.items[0].album.album_type;
            console.log(output);
             //write the output in the log.txt file
             var fs = require("fs");

             // This block of code will create a file called "movies.txt".
             // It will then print "Inception, Die Hard" in the file
             fs.writeFile("log.txt", output, function(err) {
             
               // If the code experiences any errors it will log the error to the console.
               if (err) {
                 return console.log(err);
               }
             
               // Otherwise, it will print: "log.txt was updated!"
               console.log("log.txt was updated!");
             
             });
             

        })
        //display error if any
        .catch(function (err) {
            console.log(err);
        });
}


// function to display movies
function myMovie() {
    // include the request npm package
    var request = require("request");


    // Then run a request to the OMDB API with the movie 
    var query = "http://www.omdbapi.com/?t="
    // get the movie from the user
    var movie = inputString[3];
    // when user doesn't input anything
    if (inputString[3] === undefined) {
        movie = "Mr.Nobody"
    }

    var key = "&y=&plot=short&apikey=trilogy"
    var mQuery = query + movie + key;
    request(mQuery, function (error, response, body) {

        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {
            //display the whole body so that you can view the details
            //console.log(body)
            // Parse the body of the site and recover just the required details

            var output = "Title : " + JSON.parse(body).Title + "\nYear: " + JSON.parse(body).Year + "\nIMDBRating: " + JSON.parse(body).imdbRating + "\nRating: " +
                JSON.parse(body).Ratings + "\nCountry: " + JSON.parse(body).Country + "\nLanguage: " + JSON.parse(body).Language + "\nPlot: " + JSON.parse(body).Plot +
                "\nActors: " + JSON.parse(body).Actors;
                console.log(output)
                //write the output in the log.txt file
                var fs = require("fs");

// This block of code will create a file called "movies.txt".
// It will then print "Inception, Die Hard" in the file
fs.writeFile("log.txt", output, function(err) {

  // If the code experiences any errors it will log the error to the console.
  if (err) {
    return console.log(err);
  }

  // Otherwise, it will print: "log.txt was updated!"
  console.log("log.txt was updated!");

});

        }
    });
}

//function to read the random.txt
function readRandom() {
    // fs is a core Node package for reading and writing files
    var fs = require("fs");

    // This block of code will read from the "movies.txt" file.
    // It's important to include the "utf8" parameter or the code will provide stream data (garbage)
    // The code will store the contents of the reading inside the variable "data"
    fs.readFile("random.txt", "utf8", function (error, text) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }

        // We will then print the contents of data

        return console.log(text);
        var song = text;


    });
}
//

// node commands
var inputString = process.argv;
//set command to the first input from the user
var command = inputString[2];
// command to display tweets
if (command === 'my-tweets') {
    //call function to display tweets
    myTweets();
}
//command to display song name, artist, album and preview link
else if (command === 'spotify-this-song') {
    //call funtion to dislay song details
    mySongs();
}
else if (command === 'movie-this') {
    //call function to display movie details
    myMovie();
}
//command for what you say, display the random text and the default song
else if (command === 'do-what-it-says') {
    //call the function to read the text file
    readRandom();
    //call function to display the default song 
    mySongs()

}
