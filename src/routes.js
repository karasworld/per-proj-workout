import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';

import Home from './component/Home/Home'
import Register from './component/Register/Register';

export default class Routes extends Component{
    render(){
        return(
            <Switch>
                <Route
                exact
                path="/"
                render={() => this.props.userid ? <Home userid={this.props.userid} /> : <Register />}
                />
            </Switch>
        )
    }
}
