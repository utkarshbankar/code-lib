var express = require('express');
var app = express();
var db = require('./src/db/db.js');

//var server = require('./server.js');
// ADD THESE TWO LINES to access the template api
const contentTempAPI = require('./src/api_routes/contentTempAPI');
app.use('/api', contentTempAPI);
// use the URL base url= http://localhost:3000/api/allTemplate to access from browser

/*
for static URL access in production mode
-- import path module before using this code
app.use(express.static(path.join(__dirname, 'courseLib/dist/courseLib/')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'courseLib/dist/courseLib/index.html'));
});

*/

module.exports = app;