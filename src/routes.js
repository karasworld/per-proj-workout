import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';

import Home from './component/Home/Home'
import Register from './component/Register/Register';
import Profile from './component/Profile/Profile';
import Start from './component/WorkoutStart/WorkoutStart';

export default class Routes extends Component{
    render(){
        return(
            <Switch>
                
                <Route exact path = "/" component = {Home}/>
                <Route
                path="/register"
                render={() => this.props.userid ? <Profile userid={this.props.userid} /> : <Register />}
                />
                <Route path = "/start" component = {Start}/>
            </Switch>
        )
    }
}
