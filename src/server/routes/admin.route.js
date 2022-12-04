//Contains all the routes for admin entity
const express = require('express');
const router = express.Router();
const playlist_controller = require('../controllers/playlist.controller');

router.post('/playlist', playlist_controller.createPlaylist); //crete playlist