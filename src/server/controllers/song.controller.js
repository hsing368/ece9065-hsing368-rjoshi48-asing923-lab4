const express = require('express');
var fs = require("fs");
var tracks = JSON.parse(fs.readFileSync("./data/" + "raw_tracks.json", 'utf8'));



exports.search_songs = function (req, resp){
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

        if(musicinfo.length<1){
            resp.status(404).send("Record not found");
        }
        else{
            resp.send(musicinfo);
        }
};

//to fetch all tracks
exports.song_all = function (req, res, next) {
        try {
            res.status(200).send(tracks);
        } catch (err) {
            res.status(500).send('Error fetching matching track details!')
        }
};
