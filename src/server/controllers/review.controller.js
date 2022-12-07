//Contains the actual implementation of REST APIs related to 'review' functionalityconst Playlist = require('../models/playlist.model');
const Review = require('../models/review.model');
const Playlist = require('../models/playlist.model');

exports.createReview = async function (req, res, next) {
    console.log(req.body);
    await Playlist.findOne({ playlist_title: req.body.playlist_title.toLowerCase().trim() }).then(async playlist => {
        if (playlist) {

            const review = new Review(
                {
                    desc: req.body.desc,
                    rating: req.body.rating,
                    user_id: req.body.user_id,
                    playlist_id: req.body.playlist_id
                }
            );
            try {
                const savedReview = await Review.save(review);
                res.status(200).json(`Review has been created for playlist name: ${playlist.playlist_title}`);
            }
            catch (err) {
                res.status(400).json({ message: err.message });
            }
        } else {
            res.status(403).json("Custom Playlist does not exist in database")
        }
    })
        .catch(err => {
            res.status('Internal server error while checking if list exists!')
        })
};