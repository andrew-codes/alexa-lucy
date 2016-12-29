import React, {Component} from 'react';
import {Router, browserHistory} from 'react-router';
import Routes from './../routes';

export default class Root extends Component {
    render() {
        return (
            <Router
                history={browserHistory}
                routes={Routes}
            />
        );
    }
}
