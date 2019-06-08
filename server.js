var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

var app = express();
var port = process.env.PORT || 3000;

var mongoHost = process.env.MONGO_HOST;
var mongoPort = process.env.MONGO_PORT || 92817;
var mongoUser = process.env.MONGO_USER;
var mongoPassword = process.env.MONGO_PASSWORD;
var mongoDBName = process.env.MONGO_DB_NAME;

var mongoUrl = `mongodb://${mongoUser}:${mongoPassword}@${mongoHost}:${mongoPort}/${mongoDBName}`;
var db = null;

app.use(express.static('public'));

app.use(bodyParser.json());


app.get('/', function (req, res, next){
    res.status(200).render('mainPage', {});
});

app.get('*', function (req, res, next){
  res.status(404).sendFile(__dirname + '/public/404.html');
});

app.listen(port, function () {
  console.log("== Server is listening on port", port);
});
