import React, {Component} from 'react';
import Register from '../Register/Register';
import {Link} from 'react-router-dom';

export default class Home extends Component{
    

    

    render(){
        return(
            <div>
                Starting page
                <div>
                    <Link to = "./register">
                    <button>ENTER</button>
                    </Link>
                </div>
            </div>
        );
    }
}