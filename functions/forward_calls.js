exports.handler = function(context, event, callback) {
  let twiml = new Twilio.twiml.VoiceResponse()
  twiml.dial(context.CALL_FORWARDING_NUMBER);
  callback(null, twiml);
};
