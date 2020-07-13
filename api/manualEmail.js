require('dotenv').config()
const mail = require('./emailer')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

mail.manualEmail()
