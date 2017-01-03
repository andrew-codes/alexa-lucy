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

export default {
    ...defaultConfig,
    ...userConfigFn(defaultConfig),
    virtualPort: process.env.VIRTUAL_PORT,
    dbHost: process.env.DB_HOST || 'localhost',
    dbPort: process.env.DB_PORT || 27017,
};
