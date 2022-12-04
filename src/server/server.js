const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const open = require('./routes/open.route');
const admin = require('./routes/admin.route');
const secure = require('./routes/secure.route');

const app = express();

console.log("Inside server js");

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
  });

// Set up mongoose connection
let dev_db_url = 'mongodb://localhost:27017/musiclibrary';
const mongoDB =  dev_db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
console.log(mongoDB);
//mongoose.connect(mongoDB).catch(error => logger(`Error in DB Connection ${error}`));
//mongoose.connection.on('error', error => logger(`Error in DB Connection ${error}`));
//mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

app.use('/api/open', open);


const port = 8000;
app.listen(port, () => console.log(`listening on port ${port}`));