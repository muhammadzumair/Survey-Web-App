import React, { Component } from 'react';
import { Router, Switch, Route } from 'react-router'
import Weekly from './Container/Weekly';
import SignIn from './Container/Signin';
import Monthly from './Container/Monthly';
import Home from './Container/Home';
import createBrowserHistory from 'history/createBrowserHistory'
const history = createBrowserHistory();
const Routes = () => {
    return (
        <Router history={history}>
            <Switch>
                <Route exact path="/" component={SignIn} />
                <Route path="/home" component={Home} />
                <Route path="/weekly" component={Weekly} />
                <Route path="/monthly" component={Monthly} />
                {/* <Route path="/add_branch" component={} /> */}
            </Switch>
        </Router>
    )
}

export default Routes;
