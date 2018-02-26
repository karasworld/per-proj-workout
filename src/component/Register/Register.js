import React, {Component} from 'react';
import firebase from '../../fire';

export default class Register extends Component{
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: '',
            userid: ''
        };

        this.createProfile = this.createProfile.bind(this);
        this.loginUser = this.loginUser.bind(this);
        this.logoutUser = this.logoutUser.bind(this);
    }

    createProfile(){
        firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((result)=>{
            this.setState({ userid: result.uid});
        });
    }

    loginUser(){
        firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((results)=>{
            console.log(result);
        });
    }

    logoutUser(){
        firebase
        .auth()
        .signout();
    }

    componentDidMount(){
        firebase.auth().onAuthStateChanged((result)=>{
            console.log(result);
        });
    }

    reder(){
        return(
            <div>
                <div>
                {this.state.userid && <h1>{this.state.userid}</h1>}
                <input
                type="text"
                placeholder="email"
                onChange={(event) => {
                    this.setState({ email: event.target.value });
                }}
                />
                </div>
                <div>
                <input
                type="password"
                placeholder="password"
                onChange={(event) => {
                    this.setState({ password: event.target.value });
                }}
                /> 
                </div>
                <div>
                    <button onClick={this.createProfile}>Create Profile</button>
                </div>
                <div>
                    <button onClick={this.loginUser}>Login</button>
                </div>
                <div>
                    <button onClick={this.logoutUser}>Signout</button>
                </div>             
            </div>
        );
    }
}