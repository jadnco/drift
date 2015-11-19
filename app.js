'use strict';

const express    = require('express');
const path       = require('path');
const bodyParser = require('body-parser');
const exphbs     = require('express-handlebars');
const mongoose   = require('mongoose');

const route      = require('./route');

// Connect to the database
mongoose.connect('mongodb://localhost:27017');

let app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

let api       = require('./routes/api');
let remote    = require('./routes/remote');
let accept    = require('./routes/accept');
let slideshow = require('./routes/slideshow');

app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');

app.use('/api', api);
app.use('/remote', remote);
app.use('/accept', accept);
app.use('/slideshow', slideshow);
app.use('/', slideshow);
app.use('/assets', express.static(__dirname + '/assets'));

app.listen(route.port, route.route());
console.log(route.route(), route.port);
console.log('<--------------- App is running ---------------->');

module.exports = app;
