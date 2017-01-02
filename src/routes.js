import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/App';
import About from './components/pages/About';
import Home from './components/pages/Home';
import Roomba from './components/pages/Roomba';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="about" component={About} />
        <Route path="roomba" component={Roomba}>
        </Route>
    </Route>
);
