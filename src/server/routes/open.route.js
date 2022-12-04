//Contains all the routes for open entity; accessible to all
const express = require('express');
const router = express.Router();
const playlist_controller = require('../controllers/playlist.controller');

const song_controller = require('../controllers/song.controller');

router.get('/song/all', song_controller.song_all);

router.post('/playlist', playlist_controller.createPlaylist); //crete playlist

module.exports = router;