const ReactDOMServer = require('react-dom/server');
const Html = require('./../components/Html');

module.exports = (express) => {
    express.get('/', (req, res) => {
        res.send(ReactDOMServer.renderToStaticMarkup(Html('Jarvis Home', 'Hello world')));
    });
};
