'use strict';

const express    = require('express');
const path       = require('path');
const bodyParser = require('body-parser');
const exphbs     = require('express-handlebars');
const mongoose   = require('mongoose');

// Connect to the database
mongoose.connect('mongodb://localhost:27017');

let app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

let api    = require('./routes/api');
let remote = require('./routes/remote');

app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');

app.use('/api', api);
app.use('/remote', remote);

app.use('/', express.static(__dirname + '/dist'));
app.use('/assets', express.static(__dirname + '/assets'));

app.listen(process.env.port || 3000);
console.log('<--------------- App is running ---------------->');

module.exports = app;