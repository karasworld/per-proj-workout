import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Home from './component/Home/Home'
import Register from './component/Register/Register';

export default(
    <Switch>
        <Route exact path = "/" component = {Home}/>
        <Route path = "/register" component = {Register}/>
    </Switch>
)