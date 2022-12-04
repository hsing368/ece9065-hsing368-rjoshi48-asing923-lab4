const express = require('express');
const router = express.Router();
//const SchemaValidator = require('../middlewares/SchemaValidator');
//const validateRequest = SchemaValidator(true);

const user_controller = require('../controllers/user.controller');
const song_controller = require('../controllers/song.controller');
const review_controller = require('../controllers/review.controller');

console.log("Inside open js");


router.post('/user/signup', user_controller.create_user);


router.get('/song/search/:search_key', song_controller.search_songs);

module.exports = router;