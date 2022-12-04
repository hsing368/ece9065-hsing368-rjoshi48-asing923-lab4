const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');


const open = require('./routes/open.route');
const env_path=process.cwd()+'\\config\\env-config.env';
require('dotenv').config({path : env_path}); 
const serverUtils = require('./serverUtils.js');

const app = express();
app.use(cors());

// Set up mongoose connection
mongoose.connect('mongodb://localhost/' + serverUtils.DATABASE_NAME, { useNewUrlParser: true })

const db = mongoose.connection;
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connected to database'))

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/open', open);

app.listen(serverUtils.SERVER_PORT_NUMBER, () => console.log(`Server is listening at PORT ${serverUtils.SERVER_PORT_NUMBER}`));
