const ReactDOMServer = require('react-dom/server');
const Html = require('./../components/Html');

module.exports = (express) => {
    express.use('/', (req, res) => {
        res.send(ReactDOMServer.renderToStaticMarkup(Html('Jarvis Home')));
    });
};
