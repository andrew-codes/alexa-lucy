import React from 'react';
import {createStore} from 'redux';
import {install, combineReducers} from 'redux-loop';
import {renderToStaticMarkup} from 'react-dom/server';
import {match, RouterContext} from 'react-router';
import {ModuleProvider} from 'redux-modules';
import Html from './../components/Html';
import routes from './../routes';
import {alexaAppRoot} from './../config';
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
                const initialState = {
                    Roomba: {
                        roombas: {}
                    }
                };
                const store = createStore(s => s, initialState, install());
                res.status(200).send(renderToStaticMarkup(Html(
                    'Lucy', (
                        <ModuleProvider store={store} combineReducers={combineReducers}>
                            <RouterContext {...renderProps} />
                        </ModuleProvider>
                    ),
                    JSON.stringify(initialState))));
            } else {
                res.status(404).send('Not found');
            }
        });
    }));
};
