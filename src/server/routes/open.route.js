//Contains all the routes for open entity; accessible to all
const express = require('express');
const router = express.Router();

const song_controller = require('../controllers/song.controller');

router.get('/song/all', song_controller.song_all);

module.exports = router;