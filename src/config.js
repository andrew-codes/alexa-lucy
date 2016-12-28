const path = require('path');

let userConfigFn;
try {
    userConfigFn = require(path.join(__dirname, process.env.CONFIG || ''));
}
catch (exception) {
    userConfigFn = config => config;
}

const applicationName = 'Jarvis';
let config = {
    applicationName,
    greeting: `${applicationName}, at your service`,
    isProduction: process.env.NODE_ENV === 'production',
};
config = {
    ...config,
    ...userConfigFn(config)
};
config.sslKey = path.join(__dirname, 'sslcert', process.env.SSL_KEY || '');
config.sslCert = path.join(__dirname, 'sslcert', process.env.SSL_CERT || '');
config.hasHttps = Boolean(config.httpsPort)
    && Boolean(config.sslKey)
    && Boolean(config.sslCert);

module.exports = Object.freeze(userConfigFn(config));
