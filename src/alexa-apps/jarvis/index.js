const alexa = require('alexa-app');
const config = require('./../../config');
const logger = require('./logger');
const intents = require('./intents/index');

const app = new alexa.app(config.applicationName);

app.launch((request, response) => {
    response.session('launched', 'true');
    response.say(config.greeting);
    response.shouldEndSession(false, "How can I help?");
});

app.sessionEnded(function(request, response) {
    response.say('Bye');
});

app.pre = function(request, response, type) {
    const log = logger(request);
    const password = request.data.password;
    const requestId = request.data.request.requestId;
    const sessionId = request.sessionId;
    const userId = request.sessionDetails.userId;
    const applicationId = request.sessionDetails.application.applicationId;

    log(`AWS ASK ${type} received: ${requestId}/${sessionId}`);

    if (!config.isProduction) {
        return;
    }

    if (applicationId !== config.applicationId) {
        log(`ERROR: Invalid application ID in request: ${applicationId}`);
        response.fail("Invalid application ID");
    }
    if (userId !== config.userId) {
        log(`ERROR: Invalid userId in request: ${userId}`);
        response.fail("Invalid user ID");
    }
    if (password !== config.password) {
        log(`ERROR: Invalid password in request: ${password}`);
        response.fail("Invalid password");
    }
};

// Register intents
intents.forEach((intent) => app.intent(intent.name, intent.schema, intent.handler));

module.exports = app;
