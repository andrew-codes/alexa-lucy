import injectTapEventPlugin from 'react-tap-event-plugin';
import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import Root from './Root';

injectTapEventPlugin();

const el = document.getElementById('root');
ReactDOM.render(
    <AppContainer>
        <Root />
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
