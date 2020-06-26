const EWS = require('node-ews')
const schedule = require('node-schedule')
const db = require('./queries')

const ewsConfig = {
  username: process.env.EMAILER_USERNAME,
  password: process.env.EMAILER_PASSWORD,
  host: process.env.EMAIL_HOST
};
const ews = new EWS(ewsConfig)
const url = process.env.APP_URL + 'recover/'
// const cron = require('node-cron');
//
// exports.createWeeklySchedule = function(){
//   // cron.schedule('* * * * *', () => {
//   //   console.log('Minute Mail');
//   // });
//   createReportForEmail({'email':'maxrparker@gmail.com', 'type':'department', 'value':'education'})
// }

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
  return `You travel request has been successfully submitted. If you required assistance, someone will contezct you within the next few days. If you wish to update your travel request, please visit `+url+code+`.`
}

function updatedFormEmailBody(code){
  return `You travel request has been successfully updated. If you required assistance, someone will contezct you within the next few days. If you wish to update your travel request again, please visit `+url+code+`.`
}

function singleReportEmailBody(form){
  return `Report Details: `+form
}

// function createReportForEmail(email){
//   var notices = {}
//   if(email.type == 'community'){
//     notices = db.getPastWeekNoticesByCommunity(email)
//   } else if(email.type == 'department'){
//     notices = db.getPastWeekNoticesByDepartment(email)
//   }
//   console.log(notices)

  // `<div id="printSection" v-show="false">
  //   <h2>Travel Notices for `+scopeName+`</h2>
  //   <div style="display: block; margin-before: 0.5em; margin-after: 0.5em; margin-start: auto; margin-end: auto; overflow: hidden; border-style: inset; border-width: 1px;"></div>
  //   <div v-for="entry in notices" :key="entry.id">
  //     Name: `+name+`<br>
  //     Department: `+name+`<br>
  //     Destination: `+name+`<br>
  //     # of Travellers: `+name+`<br>
  //     Arrival Date: `+name+`<br>
  //     Return Date: `+name+`<br>
  //     Contacted First Nation: `+name+`<br>
  //     Contacted Municipality: `+name+`<br>
  //     Contacted Other Group: `+name+`<br>
  //     <div `+name+`>
  //       Other Group Contact Info: `+name+`<br>
  //     </div>
  //     <div :class="requiresAssistance(entry)">
  //       Requries Assistance: {{entry.requireAssistance | booleanToUser}}
  //     </div>
  //     Purpose: `+name+`
  //     <div style="display: block; margin-before: 0.5em; margin-after: 0.5em; margin-start: auto; margin-end: auto; overflow: hidden; border-style: inset; border-width: 1px;"></div>
  //   </div>
  // </div>`
// }
