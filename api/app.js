const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3090
const db = require('./queries')
var cors = require('cors');

require('dotenv').config()

var port = process.env.PORT || 3000;
var app = express();

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use(cors());

app.get('/getCommunities', db.getCommunities)
app.get('/getCommunityGroups', db.getCommunityGroups)
app.get('/getDepartments', db.getDepartments)
app.get('/getNotices', db.getNotices)
app.get('/getNotice/:code', db.getNotice)
app.get('/report/:community', db.getReport)

app.post('/createNotice', db.createNotice)
app.post('/updateNotice', db.updateNotice)




app.listen(port, () => {
  console.log(`Travel Portal App listening on internal port ${port}`)
})
