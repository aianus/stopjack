exports.handler = function(context, event, callback) {
  let twiml = new Twilio.twiml.VoiceResponse()
  twiml.dial(context.SMS_FORWARDING_NUMBER);
  callback(null, twiml);
};
