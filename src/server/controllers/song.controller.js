const express = require('express');
var fs = require("fs");
var tracks = JSON.parse(fs.readFileSync("./data/" + "raw_tracks.json", 'utf8'));
const SongDB = require('../models/song.model');

// Create a new song based on data passed in the body
exports.song_create = function (req, res, next) {
    // Create song object
    let curr_song = new SongDB(
        {
            Title: req.body.Title,
            Artist: req.body.Artist,
            Album: req.body.Album,
            Track: req.body.Track,
            Year: req.body.Year,
            Length: req.body.Length,
            Genre: req.body.Genre,
            Reviews: [],
            Hidden: req.body.Hidden
        }
    );

    // Write the song to the db
    curr_song.write_to_db(function (error_msg, curr_song) {
        if (error_msg) {
            return next(error_msg);
        }
        if (req.body.desc != undefined) {
            review_controller.addReview(req, res, next, curr_song._id);
        }
        res.status(200).send(curr_song);
    }
    );
};

// Search song based on track name, album name, artist name and track genres
exports.search_matching_songs = function (req, resp){
    var input = req.params.search_key.toString();
    console.log(input);
    let i = 0;
    let musicinfo = [];
    tracks.forEach(element =>{
            if((element.track_title.toString().toLowerCase().includes(input.toString().toLowerCase())) 
            || (element.album_title.toString().toLowerCase().includes(input.toLowerCase())) || 
            (element.artist_name.toString().toLowerCase().includes(input.toLowerCase())) || 
            (element.track_genres.toString().toLowerCase().includes(input.toLowerCase())))
            {
                musicinfo[i] = {
                    "track_id": element.track_id,
                    "track_title": element.track_title,
                    "album_title": element.album_title,
                    "artist_name": element.artist_name,
                    "track_duration": element.track_duration,
                    "genere": element.track_genres
                }
                i++;
            }
        })

        // Check if song is found
        if(musicinfo.length<1){
            resp.status(404).send("Song not present in Database");
        }
        else{
            resp.send(musicinfo);
        }
};

// Retrieve the list of songs
exports.get_all_songs = function (req, res, next) {
        try {
            res.status(200).send(tracks);
        } catch (error_msg) {
            res.status(500).send('Error fetching matching track details!')
        }
};

// Return the sorted list of songs based on user reviews and rating
exports.get_sorted_songs_limit_n = function (req, res, next) {
    SongDB.find(
        {hidden:{$ne:false}}
        ).sort('-Rating').limit(10).populate({ 
            path: 'Reviews', 
            options: { sort: { _id: -1 }, limit: 2 },
            populate: { path: 'user_id' } 
            }).exec(function (error_msg, item) {
                if (error_msg) return next(error_msg);
                res.send(item);
            });
};

// Retrieve the list of songs by id
exports.get_songs_by_id = function (req, res, next) {
    SongDB.findById(req.params.id).populate(
            { 
                path: 'Reviews', 
                options: { sort: { _id: -1 }, limit: 2 }, 
                populate: { path: 'user_id' } }
            ).exec(function (error_msg, item) {
                if (error_msg) return next(error_msg);
                 res.send(item);
            });
};