/* eslint-disable no-unused-vars */
const express = require('express');
const history = require('connect-history-api-fallback');

require('dotenv').config()

var port = process.env.PORT || 8080;
var app = express();

app.use(history({
    verbose: true}));

app.use('',express.static('dist'))

app.listen(port);
console.log(`Travel Portal App listening on internal port ${port}`)
