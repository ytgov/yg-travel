const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const db = require('./queries')

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

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/getCommunities', db.getCommunities)
app.get('/getCommunityGroups', db.getCommunityGroups)
app.get('/getDepartments', db.getDepartments)
app.get('/getNotices', db.getNotices)
app.get('/getNotice/:code', db.getNotice)

app.get('/reports/whitehorse', db.getWhitehorse)
app.get('/reports/carmacks', db.getCarmacks)
app.get('/reports/dawson-city', db.getDawsonCity)
app.get('/reports/beaver-creek', db.getBeaverCreek)
app.get('/reports/burwash-landing', db.getBurwashLanding)
app.get('/reports/tagish', db.getTagish)
app.get('/reports/carcross', db.getCarcross)
app.get('/reports/faro', db.getFaro)
app.get('/reports/haines-junction', db.getHainesJunction)
app.get('/reports/mayo', db.getMayo)
app.get('/reports/mounte-lourne', db.getMounteLourne)
app.get('/reports/old-crow', db.getOldCrow)
app.get('/reports/pelly-crossing', db.getPellyCrossing)
app.get('/reports/ross-river', db.getRossRiver)
app.get('/reports/teslin', db.getTeslin)
app.get('/reports/watson-lake', db.getWatsonLake)

app.post('/createNotice', db.createNotice)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
