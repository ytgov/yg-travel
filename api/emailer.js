process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const EWS = require('node-ews');
const ewsConfig = {
  username: 'travapp',
  password: '5F8%x^p6',
  host: 'https://exchange.gov.yk.ca/'
};
const ews = new EWS(ewsConfig)

//const url = 'https://travel.gov.yk.ca/'
const url = 'http://localhost:8080/'

exports.sendSuccessfulSubmit = function(receiver, code){
  const subject = 'YG Travel Form Submitted'
  const body = url+'recover/'+code
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
  const body = url+'recover/'+code
  const ewsArgs = getEmailConfig(receiver, subject, submittedFormEmailBody(code))
  ews.run('CreateItem', ewsArgs)
    .then(result => {
      console.log(JSON.stringify(result));
    })
    .catch(err => {
      console.log(err.stack);
    });
}

exports.sendReport = function(receiver, code){
  const subject = 'test subject'
  const body = url+'recover/'+code
  const ewsArgs = getEmailConfig(receiver, subject, body)
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

function updateFormEmailBody(code){
  return `You travel request has been successfully updated. If you required assistance, someone will contezct you within the next few days. If you wish to update your travel request again, please visit `+url+code+`.`
}
