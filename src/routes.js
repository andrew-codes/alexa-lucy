import React from 'react';
import {Router, Route} from 'react-router';
import App from './components/App';
import About from './components/About';

export default (
    <Router>
        <Route path="/" component={App}>
            <Route path="about" component={About} />
        </Route>
    </Router>
);
