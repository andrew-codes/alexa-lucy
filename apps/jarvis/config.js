const path = require('path');
const config = require(path.join(__dirname, '..', '..', process.env.CONFIG));
config.isDev = process.env.NODE_ENV === 'dev';
module.exports = config;
