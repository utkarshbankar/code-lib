// server.js
var app = require('./app.js');
var port = process.env.PORT || 2131;
var server = app.listen(port, function() {
  console.log('Express server listening on port ' + port);
});

//module.exports = server;
/*const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const api = require('./server/contentTempAPI');
app.use('/contentTempAPI', api);

const port = 2131;

const app = express();
app.use(express.static(path.join(__dirname, 'courseLib/dist/courseLib/')));

app.use(bodyParser.urlencoded({extended: true})); 
app.use(bodyParser.json()); 
   

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'courseLib/dist/courseLib/index.html'));
});

app.listen(port, function(){
    console.log("Server running on localhost:" + port);
});*/