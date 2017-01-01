import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {match, RouterContext} from 'react-router';
import {alexaAppRoot} from './../config';
import Html from './../components/Html';
import routes from './../routes';
import {unless} from './utils';

export default (express) => {
    express.use(unless([
        /^\/public\/.*/,
        new RegExp(`${alexaAppRoot}.*`),
        /__.*/,
    ], (req, res) => {
        match({routes, location: req.url}, (error, redirectLocation, renderProps) => {
            if (error) {
                res.status(500).send(error.message);
            } else if (redirectLocation) {
                res.redirect(302, `${redirectLocation.pathname}${redirectLocation.search}`);
            } else if (renderProps) {
                res.status(200).send(renderToStaticMarkup(Html('Lucy', <RouterContext {...renderProps} />)));
            } else {
                res.status(404).send('Not found');
            }
        });
    });
};
