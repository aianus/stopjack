const sgMail = require('@sendgrid/mail');

function forwardSMSviaSMSTwiml(context, event) {
  let twiml = new Twilio.twiml.MessagingResponse();
  twiml.message(`From: ${event.From}. Body: ${event.Body}`, {
    to: context.SMS_FORWARDING_NUMBER
  });
  return twiml;
}

function forwardSMSviaEmail(context, event) {
  sgMail.setApiKey(context.SENDGRID_API_KEY);
  const msg = {
    to: context.SMS_FORWARDING_TO_EMAIL,
    from: context.SMS_FORWARDING_FROM_EMAIL,
    subject: `New SMS message from: ${event.From}`,
    text: event.Body
  };
  return sgMail.send(msg);
}

exports.handler = function(context, event, callback) {
  let twiml = forwardSMSviaSMSTwiml(context, event);

  forwardSMSviaEmail(context, event)
    .then(function() {
      callback(null, twiml);
    })
    .catch(function(err) {
      callback(err);
    })
};
