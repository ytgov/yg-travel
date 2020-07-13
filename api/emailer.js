const EWS = require('node-ews')
const schedule = require('node-schedule')
const db = require('./queries')
const environment = process.env.NODE_ENV || 'staging'
const config = require('./config/knexfile.js')[environment]
const knex = require('knex')(config)
const moment = require('moment')

const ewsConfig = {
  username: process.env.EMAILER_USERNAME,
  password: process.env.EMAILER_PASSWORD,
  host: process.env.EMAIL_HOST
}

const ews = new EWS(ewsConfig)
const url = process.env.APP_URL + 'recover/'
const cron = require('node-cron');

exports.createWeeklySchedule = function(){
  cron.schedule('0 8 * * 1', () => {
    sendWeeklyReport()
  })
}

exports.manualEmail = function(){
    sendWeeklyReport()
}

function sendEmail(receiver, subject, body){
  const ewsArgs = getEmailConfig(receiver, subject, body)
  ews.run('CreateItem', ewsArgs)
    .then(result => {
      console.log(JSON.stringify(result));
    })
    .catch(err => {
      console.log(err.stack);
    });
}

exports.sendEmail = function(receiver, subject, body){
  const ewsArgs = getEmailConfig(receiver, subject, body)
  ews.run('CreateItem', ewsArgs)
    .then(result => {
      console.log(JSON.stringify(result));
    })
    .catch(err => {
      console.log(err.stack);
    });
}

exports.sendSuccessfulSubmit = function(receiver, code){
  const subject = 'YG Travel Form Submitted'
  const ewsArgs = getEmailConfig(receiver, subject, submittedFormEmailBody(code))
  ews.run('CreateItem', ewsArgs)
    .then(result => {
      console.log(JSON.stringify(result));
    })
    .catch(err => {
      console.log(err.stack);
    });
}

exports.sendSuccessfulUpdate = function(receiver, code){
  const subject = 'YG Travel Form Updated'
  const ewsArgs = getEmailConfig(receiver, subject, updatedFormEmailBody(code))
  ews.run('CreateItem', ewsArgs)
    .then(result => {
      console.log(JSON.stringify(result));
    })
    .catch(err => {
      console.log(err.stack);
    });
}

exports.sendSingleCommunityReport = function(receiver, form){
  //should have something about requiring assistance
  const subject = 'A Travel Notice for your community has been Submitted'
  const ewsArgs = getEmailConfig(receiver, subject, singleReportCommunityEmailBody(form))
  ews.run('CreateItem', ewsArgs)
    .then(result => {
      console.log(JSON.stringify(result));
    })
    .catch(err => {
      console.log(err.stack);
    });
}

exports.sendSingleDepartmentReport = function(receiver, form){
  //should have something about requiring assistance
  const subject = 'A Travel Notice for your community has been Submitted'
  const ewsArgs = getEmailConfig(receiver, subject, singleReportDepartmentEmailBody(form))
  ews.run('CreateItem', ewsArgs)
    .then(result => {
      console.log(JSON.stringify(result));
    })
    .catch(err => {
      console.log(err.stack);
    });
}

function sendWeeklyReport()
{
  knex('emails')
  .select('*')
  .then(res => {
    res.forEach( entry => {
      if(entry.frequency == 'Weekly' || entry.frequency == 'Both'){
        if(entry.type == 'community'){
          knex('travelNotices')
          .select('*')
          .whereRaw('replace(replace(replace(replace(lower(destination), \'\'\'\', \'\'), \',\', \'\'), \' \', \'-\'), \'&\', \'and\') like ? and current_date - INTERVAL \'1 week\' <= "noticeCreated" OR current_date - INTERVAL \'1 week\' <= "noticeUpdated"', ['%"'+entry.value.toLowerCase()+'"%'])
          .then(notices => {
            notices.map(notice => {
              notice = parseDestination(notice)
            })
            sendEmail(entry.email, 'Travel Report for '+entry.value+', '+moment().subtract(1, 'week').format('MMMM D')+' to '+moment().format('MMMM D'), createReportForEmail(notices))
          })
          .catch(function(e){
            console.log(e)
          })
        } else if(entry.type == 'department'){
          knex('travelNotices')
          .select('*')
          .whereRaw('replace(replace(replace(replace(lower(department), \'\'\'\', \'\'), \',\', \'\'), \' \', \'-\'), \'&\', \'and\') like ? and current_date - INTERVAL \'1 week\' <= "noticeCreated" OR current_date - INTERVAL \'1 week\' <= "noticeUpdated"', [entry.value.toLowerCase()])
          .then(notices => {
            notices.map(notice => {
              notice = parseDestination(notice)
            })
            sendEmail(entry.email, 'Travel Report for '+entry.value+', '+moment().subtract(1, 'week').format('MMMM D')+' to '+moment().format('MMMM D'), createReportForEmail(notices))
          })
          .catch(function(e){
            console.log(e)
          })
        }
      }
    })
  })
  .catch(function(e){
    console.log(e)
  })
}

function parseDestination(form) {
  form.destination = JSON.parse(form.destination)
  return form
}

function getEmailConfig( receiver, subject, body ){
  return {
    "attributes" : {
      "MessageDisposition" : "SendAndSaveCopy"
    },
    "SavedItemFolderId": {
      "DistinguishedFolderId": {
        "attributes": {
          "Id": "sentitems"
        }
      }
    },
    "Items" : {
      "Message" : {
        "ItemClass": "IPM.Note",
        "Subject" : subject,
        "Body" : {
          "attributes": {
            "BodyType" : "Text"
          },
          "$value": body
        },
        "ToRecipients" : {
          "Mailbox" : {
            "EmailAddress" : receiver
          }
        },
        "IsRead": "false"
      }
    }
  }
}

function submittedFormEmailBody(code){
  return `You travel request has been successfully submitted. If you required assistance, someone will contact you within the next few days. If you wish to update your travel request, please visit `+url+code+`.`
}

function updatedFormEmailBody(code){
  return `You travel request has been successfully updated. If you required assistance, someone will contact you within the next few days. If you wish to update your travel request again, please visit `+url+code+`.`
}

function singleReportEmailBody(form){
  return `Report Details: `+form
}

function createReportForEmail(notices){
  report = ''
  notices.forEach((notice) => {
    const contactedFirstNation = notice.contactedFirstNation ? "Yes" : "No"
    const contactedMunicipality = notice.contactedMunicipality ? "Yes" : "No"
    const contactedOtherGroup = notice.contactedOtherGroup ? "Yes" : "No"
    report += 'Name: '+notice.name+"\n"
      +'Department: '+notice.department+"\n"
      +'Destination: '+destinationToString(notice.destination)+"\n"
      +'Number of Travellers: '+notice.travellers+"\n"
      +'Arrival Date: '+moment(notice.arrivalDate).format('LL')+"\n"
      +'Return Date: '+moment(notice.returnDate).format('LL')+"\n"
      +'Purpose: '+notice.purpose+"\n"
      +'Contacted First Nation: '+contactedFirstNation+"\n"
      +'Contacted Municipality: '+contactedMunicipality+"\n"
      +'Contacted Other Group: '+contactedOtherGroup+"\n"
    if(notice.contactedOtherGroup) report += notice.otherGroupInfo+"\n"
    report += '─────────────────────'+"\n"
  })
  return report
}

exports.createSingleReportForEmail = function(notice){
  report = ''
  const contactedFirstNation = notice.contactedFirstNation ? "Yes" : "No"
  const contactedMunicipality = notice.contactedMunicipality ? "Yes" : "No"
  const contactedOtherGroup = notice.contactedOtherGroup ? "Yes" : "No"
  report += 'Name: '+notice.name+"\n"
    +'Department: '+notice.department+"\n"
    +'Destination: '+destinationToString(notice.destination)+"\n"
    +'Number of Travellers: '+notice.travellers+"\n"
    +'Arrival Date: '+moment(notice.arrivalDate).format('LL')+"\n"
    +'Return Date: '+moment(notice.returnDate).format('LL')+"\n"
    +'Purpose: '+notice.purpose+"\n"
    +'Contacted First Nation: '+contactedFirstNation+"\n"
    +'Contacted Municipality: '+contactedMunicipality+"\n"
    +'Contacted Other Group: '+contactedOtherGroup+"\n"
  if(notice.contactedOtherGroup) report += notice.otherGroupInfo+"\n"
  return report
}

function destinationToString(destination){
  return destination.toString().replace(/,/g, ', ')
}
