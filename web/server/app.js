/* eslint-disable no-unused-vars */
const express = require('express');
const history = require('connect-history-api-fallback');
const bodyParser = require('body-parser')
const db = require('./queries')


require('dotenv').config()

var port = process.env.PORT || 8080;
var app = express();



app.use(bodyParser.json())

app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  )

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//API Calls

  
  
  app.get('/api', function (req, res) {
    console.log ('API is up')
    res.json({ info: 'Node.js, Express, and Postgres API' })
  })
  
  app.get('/api/communities', db.getCommunities)
  app.get('/api/communityGroups', db.getCommunityGroups)
  app.get('/api/getNotices', db.getNotices)
  app.get('/api/getNotice/:code', db.getNotice)
  
  app.post('/api/createNotice', db.createNotice)

  app.use(history({
    verbose: true}));   
  
  app.use('',express.static('dist'))

app.listen(port);
console.log(`Travel Portal App listening on internal port ${port}`)
