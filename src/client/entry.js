import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import Root from './Root';

const el = document.getElementById('root');
ReactDOM.render(
    <AppContainer>
        <Root />
    </AppContainer>,
    el
);

if (module.hot) {
    module.hot.accept('./Root', () => {
        console.log('hereae;jlrkaj;sfd')
        const NextApp = require('./Root').default;
        // If you use Webpack 2 in ES modules mode, you can
        // use <App /> here rather than require() a <NextApp />.
        console.log(NextApp)
        ReactDOM.render(
            <AppContainer>
                <NextApp />
            </AppContainer>,
            el
        );
    });
}
