# stopjack
Stop SIM jacking: full control over your calls and SMS

## Deployment Instructions

Install twilio CLI with the serverless plugin

Fill in the environment variables languages in .env (do not commit to version control) and run `twilio serverless:deploy --override-existing-project --runtime node22 --environment <your env>`

Depending on the country of the destination phone number, you may have to enable geo permissions on Twilio's website.
