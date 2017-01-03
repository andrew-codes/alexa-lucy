const AlexaAppServer = require('alexa-app-server');
import config from './config';
import register from './server-modules';

const serverConfig = {
    server_root: __dirname,
    public_html: 'public',
    app_dir: 'alexa-apps',
    app_root: config.alexaAppRoot,
    port: config.virtualPort,
};
const server = AlexaAppServer.start(serverConfig);
register(server.express);

export default server;
