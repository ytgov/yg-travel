require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3000
const db = require('./queries')
const cors = require('cors')

console.log(process.env)

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use(cors());

app.get('/api/status', function (req, res) {
    res.send('The API Service is running');
});

app.get('/getCommunities', db.getCommunities)
app.get('/getCommunityGroups', db.getCommunityGroups)
app.get('/getDepartments', db.getDepartments)
app.get('/getNotices', db.getNotices)
app.get('/getNotice/:code', db.getNotice)
app.get('/report/byCommunity/:community', db.getReportByCommunity)
app.get('/report/byDepartment/:department', db.getReportByDepartment)

app.post('/createNotice', db.createNotice)
app.post('/updateNotice', db.updateNotice)

app.listen(port, () => {
  console.log(`Travel Portal App listening on internal port ${port}`)
})
