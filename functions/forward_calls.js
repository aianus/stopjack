exports.handler = function (context, event, callback) {
  let twiml = new Twilio.twiml.VoiceResponse();
  twiml.dial({ callerId: context.CALL_FORWARDING_CALLER_ID }, context.CALL_FORWARDING_NUMBER);
  callback(null, twiml);
};
