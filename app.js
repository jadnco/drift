var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

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