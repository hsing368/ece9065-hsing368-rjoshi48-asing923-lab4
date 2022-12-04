var fs = require("fs");
var tracks = JSON.parse(fs.readFileSync("./data/" + "raw_tracks.json", 'utf8'));


//to fetch all tracks
exports.song_all = function (req, res, next) {
        try {
            res.status(200).send(tracks);
        } catch (err) {
            res.status(500).send('Error fetching matching track details!')
        }
};
