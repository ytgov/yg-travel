const EWS = require('node-ews');
const ewsConfig = {
  username: process.env.EMAILER_USERNAME,
  password: process.env.EMAILER_PASSWORD,
  host: process.env.EMAIL_HOST
};
const ews = new EWS(ewsConfig)

const url = process.env.APP_URL + 'recover/'

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

exports.sendSingleReport = function(receiver, form){
  //should have something about requiring assistance
  const subject = 'A Travel Notice for your Community has been Submitted'
  const ewsArgs = getEmailConfig(receiver, subject, singleReportEmailBody(form))
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
