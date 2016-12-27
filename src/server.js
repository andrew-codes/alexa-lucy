'use strict';

const AlexaAppServer = require('alexa-app-server');
const config = require('./config');

let serverConfig = {
    server_root: __dirname,
    public_html: 'public',
    app_dir: 'alexa-apps',
    app_root: '/alexa/',
    port: config.port,
};
if (config.hasHttps) {
    serverConfig.httpsEnabled = true;
    serverConfig.privateKey = config.sslKey;
    serverConfig.certificate = config.sslCert;
}
AlexaAppServer.start(serverConfig);
