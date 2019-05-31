var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');

var app = express();
var port = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/', function (req, res, next){
  res.status(200).sendFile(__dirname + '/public/index.html');
});

app.get('*', function (req, res, next){
  res.status(404).sendFile(__dirname + '/public/404.html');
});

app.listen(port, function () {
  console.log("== Server is listening on port", port);
});
