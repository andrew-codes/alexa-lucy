import injectTapEventPlugin from 'react-tap-event-plugin';
import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {createStore, compose} from 'redux';
import {install, combineReducers} from 'redux-loop';
import {ModuleProvider} from 'redux-modules';
import RoombaModule from './../redux-modules/Roomba';
import Root from './Root';

injectTapEventPlugin();

const el = document.getElementById('root');
const initialState = window.__INITIAL_STATE__ || {};
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(s => s, initialState, composeEnhancers(
    install(),
));

store.dispatch(RoombaModule.actions.init());

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
        ReactDOM.render(
            <AppContainer>
                <NextApp />
            </AppContainer>,
            el
        );
    });
}
