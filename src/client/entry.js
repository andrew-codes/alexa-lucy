import injectTapEventPlugin from 'react-tap-event-plugin';
import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {createStore} from 'redux';
import {install, combineReducers} from 'redux-loop';
import {ModuleProvider} from 'redux-modules';
import Root from './Root';

injectTapEventPlugin();

const el = document.getElementById('root');
const initialState = window.__INITIAL_STATE__ || {};
const store = createStore(s => s, initialState, install());
ReactDOM.render(
    <AppContainer>
        <ModuleProvider store={store} combineReducers={combineReducers}>
            <Root />
        </ModuleProvider>
    </AppContainer>,
    el
);

if (module.hot) {
    module.hot.accept('./Root', () => {
        const NextApp = require('./Root').default;
        // If you use Webpack 2 in ES modules mode, you can
        // use <App /> here rather than require() a <NextApp />.
        ReactDOM.render(
            <AppContainer>
                <NextApp />
            </AppContainer>,
            el
        );
    });
}
