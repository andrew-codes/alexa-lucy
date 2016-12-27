const path = require('path');

const srcPath = path.join(__dirname, '..');

const config = require(path.join(srcPath, 'config', process.env.CONFIG || 'example.config.js'));
config.sslKey = path.join(srcPath, 'sslcert', process.env.SSL_KEY || '');
config.sslCert = path.join(srcPath, 'sslcert', process.env.SSL_CERT || '');
config.hasHttps = Boolean(config.httpsPort)
    && Boolean(config.sslKey)
    && Boolean(config.sslCert);

module.exports = Object.freeze(config);
