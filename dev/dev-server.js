require('babel-register');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const router = require('react-router');
const webpack = require('webpack');
const Html = require('./../src/components/Html').default;
const config = require('./webpack.config');
const server = require('./../src/server').default;
const routes = require('./../src/routes').default;
const compiler = webpack(config);

server.express.use(require('webpack-dev-middleware')(compiler, {
    publicPath: config.output.publicPath
}));

server.express.use(require('webpack-hot-middleware')(compiler));

server.express.get('/*', function(req, res) {
    router.match({routes, location: req.url}, (error, redirectLocation, renderProps) => {
        if (error) {
            res.status(500).send(error.message);
        } else if (redirectLocation) {
            res.redirect(302, `${redirectLocation.pathname}${redirectLocation.search}`);
        } else if (renderProps) {
            res.status(200).send(ReactDOMServer.renderToStaticMarkup(Html('Jarvis', React.createElement(router.RouterContext, renderProps))));
        } else {
            res.status(404).send('Not found');
        }
    });
});
