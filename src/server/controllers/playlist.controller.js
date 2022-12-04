//Contains the actual implementation of REST APIs related to 'playlist' functionality
const Playlist = require('../models/playlist.model');

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