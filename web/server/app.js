const express = require('express')
const bodyParser = require('body-parser')
const history = require('connect-history-api-fallback');
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


app.get('/api', function (req, res) {
  console.log ('API is up')
  res.json({ info: 'Node.js, Express, and Postgres API' })
})


app.get('/api/getCommunities', db.getCommunities)
app.get('/api/getCommunityGroups', db.getCommunityGroups)
app.get('/api/getDepartments', db.getDepartments)
app.get('/api/getNotices', db.getNotices)
app.get('/api/getNotice/:code', db.getNotice)

app.get('/api/reports/whitehorse', db.getWhitehorse)
app.get('/api/reports/carmacks', db.getCarmacks)
app.get('/api/reports/dawson-city', db.getDawsonCity)
app.get('/api/reports/beaver-creek', db.getBeaverCreek)
app.get('/api/reports/burwash-landing', db.getBurwashLanding)
app.get('/api/reports/tagish', db.getTagish)
app.get('/api/reports/carcross', db.getCarcross)
app.get('/api/reports/faro', db.getFaro)
app.get('/api/reports/haines-junction', db.getHainesJunction)
app.get('/api/reports/mayo', db.getMayo)
app.get('/api/reports/mounte-lourne', db.getMounteLourne)
app.get('/api/reports/old-crow', db.getOldCrow)
app.get('/api/reports/pelly-crossing', db.getPellyCrossing)
app.get('/api/reports/ross-river', db.getRossRiver)
app.get('/api/reports/teslin', db.getTeslin)
app.get('/api/reports/watson-lake', db.getWatsonLake)

app.post('/api/createNotice', db.createNotice)
app.post('/api/updateNotice', db.updateNotice)

app.use(history({
  verbose: true}));

app.use('',express.static('dist'))

app.listen(port);
console.log(`Travel Portal App listening on internal port ${port}`)
