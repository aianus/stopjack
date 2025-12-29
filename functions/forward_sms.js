const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses");

function forwardSMSviaSMSTwiml(context, event) {
  let twiml = new Twilio.twiml.MessagingResponse();
  twiml.message(`From: ${event.From}. Body: ${event.Body}`, {
    to: context.SMS_FORWARDING_NUMBER
  });
  return twiml;
}

function forwardSMSviaEmail(context, event) {
  const client = new SESClient({
    region: context.AWS_REGION || 'us-east-1',
    credentials: {
      accessKeyId: context.AWS_ACCESS_KEY_ID,
      secretAccessKey: context.AWS_SECRET_ACCESS_KEY
    }
  });

  const command = new SendEmailCommand({
    Destination: {
      ToAddresses: [context.SMS_FORWARDING_TO_EMAIL],
    },
    Message: {
      Body: {
        Text: {
          Data: event.Body,
        },
      },
      Subject: {
        Data: `New SMS message from: ${event.From}`,
      },
    },
    Source: context.SMS_FORWARDING_FROM_EMAIL,
  });

  return client.send(command);
}

exports.handler = function (context, event, callback) {
  // let twiml = forwardSMSviaSMSTwiml(context, event);
  let twiml = null

  forwardSMSviaEmail(context, event)
    .then(function () {
      callback(null, twiml);
    })
    .catch(function (err) {
      console.error(err);
      callback(err);
    });
};
