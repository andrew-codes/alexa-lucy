import React from 'react';
import {renderToString} from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from './../routes';
import Html from './../components/Html';

export default (express) => {
    express.get('/*', (req, res) => {
        match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
            if (error) {
                res.status(500).send(error.message);
            } else if (redirectLocation) {
                res.redirect(302, `${redirectLocation.pathname}${redirectLocation.search}`);
            } else if (renderProps) {
                res.status(200).send(renderToString(Html('Jarvis', <RouterContext {...renderProps} />)));
            } else {
                res.status(404).send('Not found');
            }
        });
    });
};
