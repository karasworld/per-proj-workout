import React, {Component} from 'react';
import Register from '../Register/Register';

export default class Home extends Component{
    

    

    render(){
        return(
            <div>
                WELCOME HOME {this.props.name}
            </div>
        );
    }
}