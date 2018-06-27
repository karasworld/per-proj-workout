import React, {Component} from 'react';
import Register from '../Register/Register';
import {Link} from 'react-router-dom';
import cover from './scott-webb.jpg';
import './Home.css'

export default class Home extends Component{
    

    

    render(){
        return(
            <div className="hm-main-body">
               <div className="hm-main-text">

                   <img src={cover} alt="Photo by Scott Webb on Unsplash"/>
                   <h3>Create a custom workout plan that meet your individual needs. </h3>
                   <h3 className="hm-intro-text">CUSTOM FIT ONLINE offers the option of picking which part of your body you would like to focus on and creating a routine based around your needs.</h3>
               </div>
                <div className="hm-main-button">
                    <Link to = "./register">
                    <button>BEGIN</button>
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