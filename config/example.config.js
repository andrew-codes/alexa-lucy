module.exports.port = 8080;
module.exports.httpsPort = 8443;
module.exports.isProduction = false;

// Name of the application/skill, which does not need to match the skills 'Invocation Name',
// Defines both the Alexa-App-Server endpoint and the skills own name used in cards.
module.exports.applicationName = 'Jarvis';

// AWS ASK applicationId, resembles 'amzn1.echo-sdk-ams.app.[your-unique-value-here]'
module.exports.applicationId = 'amzn1.echo-sdk-ams.app.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';

// AWS ASK userID, resembles 'amzn1.echo-sdk-account.[your-unique-value-here]'
module.exports.userId = 'amzn1.echo-sdk-account.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';

// AWS ASK password, randomly generated password to be included in the Skill's endpoint URL (i.e. '?password=XXXXXXXXXXXX')
module.exports.password = 'XXXXXXXXXXXX';

// Greeting, when saying 'Alexa, open...'
module.exports.greeting = 'Jarvis, at your service';
