const AlexaAppServer = require('alexa-app-server');
import config from './config';
import register from './server-modules';

const serverConfig = {
    server_root: __dirname,
    public_html: 'public',
    app_dir: 'alexa-apps',
    app_root: config.alexaAppRoot,
    port: 8080,
};
if (config.hasHttps) {
    serverConfig.httpsPort = 8443;
    serverConfig.httpsEnabled = true;
    serverConfig.privateKey = config.sslKey;
    serverConfig.certificate = config.sslCert;
}
const server = AlexaAppServer.start(serverConfig);
register(server.express);

export default server;
