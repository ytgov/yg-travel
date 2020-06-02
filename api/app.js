require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3000
const db = require('./queries')
const cors = require('cors')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use(cors());

app.get('/api/status', function (req, res) {
    res.send('The API Service is running');
})

app.get('/api/v1/getCommunities', db.getCommunities)
app.get('/api/v1/getCommunityGroups', db.getCommunityGroups)
app.get('/api/v1/getDepartments', db.getDepartments)
app.get('/api/v1/getNotices', db.getNotices)
app.get('/api/v1/getNotice/:code', db.getNotice)
app.get('/api/v1/getNotices/byCommunity/:community', db.getNoticesByCommunity)
app.get('/api/v1/getNotices/byDepartment/:department', db.getNoticesByDepartment)

app.post('/api/v1/createNotice', db.createNotice)
app.post('/api/v1/updateNotice', db.updateNotice)
app.post('/api/v1/deleteNotice', db.deleteNotice)

app.get('/api/v1/getEmails', db.getEmails)
app.get('/api/v1/getEmailsByCommunity/:community', db.getEmailsByCommunity)

app.post('/api/v1/createEmail', db.createEmail)
app.post('/api/v1/updateEmail', db.updateEmail)
app.post('/api/v1/deleteEmail', db.deleteEmail)

app.listen(port, () => {
  console.log(`Travel Portal App listening on internal port ${port}`)
})
