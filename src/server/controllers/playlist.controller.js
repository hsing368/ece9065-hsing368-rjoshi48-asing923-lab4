//Contains the actual implementation of REST APIs related to 'playlist' functionality
const Playlist = require('../models/playlist.model');
const Song = require('../models/song.model');
const Fuse = require('fuse.js');

exports.createPlaylist = async function (req, res, next) {
    console.log(req.body);
    await Playlist.findOne({ playlist_title: req.body.playlist_title.toLowerCase().trim() }).then(async playlist => {
        if (playlist) {
            res.status(403).json("Custom playlist already exist in database")
        } else {
            const playlist = new Playlist(
                {
                    playlist_title: req.body.playlist_title.toLowerCase().trim(),
                    playlist_desc: req.body.playlist_desc,
                    user_id: req.body.user_id,
                    songs: [req.body.songs],
                    visiblity: req.body.visiblity
                }
            );
            try {
                const savedPlaylist = await playlist.save();
                res.status(200).json(`Playlist has been created with name: ${savedPlaylist.playlist_title}`);
            }
            catch (err) {
                res.status(400).json({ message: err.message });
            }
        }
    })
        .catch(err => {
            res.status('Internal server error while checking if list exists!')
        })
};


exports.songCreate = function (req, res, next) {
    let userSong = new Song(
        {
            SongTitle: req.body.Title,
            ArtistName: req.body.Artist,
            AlbumName: req.body.Album,
            TrackName: req.body.Track,
            YearOfAlbum: req.body.Year,
            TrackLength: req.body.Length,
            GenreName: req.body.Genre,
            ReviewsGiven: [],
            Hidden: req.body.Hidden
        }
    );
  
    userSong.save(function (error, userSong) {
        if (error) {
            return next(error);
        }
        if (req.body.desc != undefined) {
            review_controller.addReview(req, res, next, userSong._id);
        }
        res.status(200).send(userSong);

    }
    );

};

// controller to retrieve user playlists
exports.validatedUserPlaylist = function (req, res, next) {
    Playlist.find({ user_id: req.params.userId }).select('-songs').exec(function (error, customPlaylist) {
        if (error) return next(error);
        res.send(customPlaylist);
    });
};

exports.playlistDetailsById = function (req, res, next) {

    Playlist.findById(req.params.playlistId).select('songs').populate({
        path: 'songs',
        populate: { path: 'Reviews', options: { sort: { _id: -1 }, limit: 2 }, populate: { path: 'userId' } }
    }).exec(function (error, playlistUser) {
        if (error) return next(error);
        res.send(playlistUser.songs);
    });
};

exports.searchPlaylist = function (req, res, next) {   
    Playlist.find(
        { visiblity:{$ne:'private'},
         $text: { $search: req.params.searchParam } },
        { score: { $meta: "textScore" } }
    )   
        .sort({ score: { $meta: 'textScore' } }).select('-songs').exec(function (error, element) {

            if (element.length != 0) {
                res.send(element);
            }
            if (error) return next(err);
            else {
                Playlist.find({visiblity:{$ne:'private'}}).exec(function (error, element) {
                    if (error) { return next(error); }
                    else {
                        var features = {
                            Sorting: true,
                            thresholdVal: 0.4,
                            loc: 0,
                            length: 100,
                            maxPatDist: 32,
                            minPatDist: 3,
                            feats: [
                                "playlist_title",
                                "playlist_desc"
                            ]
                        };
                        var fuse = new Fuse(element, features);
                        element = fuse.search(req.params.searchParam);
                        res.send(element);
                    }
                });
            }
        });
};