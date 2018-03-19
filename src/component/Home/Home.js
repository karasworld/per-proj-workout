import React, {Component} from 'react';
import Register from '../Register/Register';
import {Link} from 'react-router-dom';
import './Home.css'

export default class Home extends Component{
    

    

    render(){
        return(
            <div className="hm-main-body">
               <div className="hm-main-text">
                   <h3>Create a custom workout plan that meet your individual needs. </h3>
                   <h3>CUSTOM FIT ONLINE offer the option of picking which part of your body you would like to focus on and creating a routine based around your needs.</h3>
               </div>
                <div className="hm-main-button">
                    <Link to = "./register">
                    <button>Let's get started!</button>
                    </Link>
                </div>
                <div className="hm-main-footer">
                    <h4>"Pain is weakness leaving the Body"</h4>
                    <h6>United States Marine Corps.</h6>
                </div>
            </div>
        );
    }
}