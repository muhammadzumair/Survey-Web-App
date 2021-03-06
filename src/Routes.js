import React, {Component} from 'react';
import { Router, Switch, Route } from 'react-router'
import Home from './Container/Home';
import SignIn from './Container/Signin';
import createBrowserHistory from 'history/createBrowserHistory'
const history = createBrowserHistory();
const Routes = () => {
    return (
        <Router history={history}>
            <Switch>
                <Route exact path="/" component={SignIn}/>
                <Route path="/home" component={Home} />
                {/* <Route path="/reason_analytics" component={}/>
                <Route path="/add_branch" component={}/> */}
            </Switch>
        </Router>
    )
}

export default Routes;
