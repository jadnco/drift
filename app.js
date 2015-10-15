const express    = require('express');
const path       = require('path');
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');

// Connect to the database
mongoose.connect('mongodb://localhost:27017');

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var api = require('./routes/api');

app.set('view engine', 'jade');

app.use('/api', api);

app.use('/', express.static(__dirname + '/dist'));

app.listen(process.env.port || 3000);
console.log('<--------------- App is running ---------------->');

module.exports = app;