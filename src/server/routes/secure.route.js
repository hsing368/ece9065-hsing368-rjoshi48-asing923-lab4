//Contains all the routes for authenticated and authorized user entity

const express = require('express');
const router = express.Router();

const playlist_controller = require('../controllers/playlist.controller');
const review_controller = require('../controllers/review.controller');
const song_controller = require('../controllers/song.controller');

router.post('/song', song_controller.song_create);