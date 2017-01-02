import path from 'path';

let userConfigFn;
try {
    userConfigFn = require(path.join(__dirname, '..', 'user.config.js')).default;
}
catch (exception) {
    userConfigFn = config => config;
}

const applicationName = 'Lucy';
const defaultConfig = {
    applicationName,
    alexaAppRoot: '/alexa/',
    greeting: `${applicationName}, at your service`,
    isProduction: process.env.NODE_ENV === 'production',
};

const config = {
    ...defaultConfig,
    ...userConfigFn(defaultConfig)
};
config.sslKey = path.join(__dirname, 'sslcert', process.env.SSL_KEY || '');
config.sslCert = path.join(__dirname, 'sslcert', process.env.SSL_CERT || '');
config.hasHttps = Boolean(config.httpsPort)
    && Boolean(config.sslKey)
    && Boolean(config.sslCert);

export default config;
