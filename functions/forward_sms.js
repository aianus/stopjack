exports.handler = function(context, event, callback) {
  let twiml = new Twilio.twiml.MessagingResponse();
  twiml.message(`From: ${event.From}. Body: ${event.Body}`, {
    to: context.SMS_FORWARDING_NUMBER
  });

  // TODO: SendGrid email

  callback(null, twiml);
};
