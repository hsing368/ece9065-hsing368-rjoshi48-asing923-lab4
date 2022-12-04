const express = require('express');
const router = express.Router();
//const SchemaValidator = require('../middlewares/SchemaValidator');
//const validateRequest = SchemaValidator(true);

const user_controller = require('../controllers/user.controller');
const song_controller = require('../controllers/song.controller');
const review_controller = require('../controllers/review.controller');
const playlist_controller = require('../controllers/playlist.controller');


router.post('/user/signup', user_controller.create_user);


router.get('/song/search/:search_key', song_controller.search_songs);

router.get('/song/all', song_controller.song_all);

router.post('/playlist', playlist_controller.createPlaylist); //crete playlist

module.exports = router;