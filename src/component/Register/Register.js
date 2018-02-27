import React, {Component} from 'react';

import firebase from '../../fire';
import axios from 'axios';

export default class Register extends Component {
    constructor(props) {
      super(props);
      this.state = {
        email: '',
        password: '',
        userid: '',
        name: '',
        age: '', 
        gender: [], 
        startweight: '', 
        goalweight: '' 
        // profilepic: '', 
        // startingbodypic: ''
      };
      this.createAccount = this.createAccount.bind(this);
      this.loginUser = this.loginUser.bind(this);
      this.signOutUser = this.signOutUser.bind(this);
      this.handleCreate = this.handleCreate.bind(this);
      this.handleNameInput = this.handleNameInput.bind(this);
      this.handleAgeInput = this.handleAgeInput.bind(this);
      this.handleSelectedGender = this.handleSelectedGender.bind(this);
      this.handleStartWeight = this.handleStartWeight.bind(this);
      this.handleGoalWeight = this.handleGoalWeight.bind(this);
    }

    handleNameInput(e){
      this.setState({name: e.target.value})
    }
    handleAgeInput(e){
      this.setState({age: e.target.value})
    }
    handleSelectedGender(e){
      this.setState({gender: e.target.value})
    }
    handleStartWeight(e){
      this.setState({startweight: e.target.value})
    }
    handleGoalWeight(e){
      this.setState({goalweight: e.target.value})
    }
    

    
    handleCreate(e){
      const {userid, name, age, gender, startweight, goalweight, profilepic, startingbodypic} = this.state
      axios
      .post('/api/createpage', {userid, name, age, gender, startweight, goalweight, profilepic, startingbodypic})
      .then(response => response.data)
      .catch(console.log)
    }


    createAccount() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((response) => {
          console.log(response)
          this.handleCreate()
          this.setState({ userid: response.uid });

        });
    }
  
    loginUser() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((result) => {
          console.log("hello there", result);
        });
    }
  
    signOutUser() {
      firebase.auth().signOut();
    }
  
    componentDidMount() {
      firebase.auth().onAuthStateChanged((result) => {
        console.log(result);
      });
    }
  
    render() {
      return (
        <div>
          {this.state.userid && <h1>{this.state.userid}</h1>}
          <input
            type="text"
            placeholder="email"
            onChange={(event) => {
                this.setState({ email: event.target.value });
            }}
          />
  
          <input
            type="password"
            placeholder="password"
            onChange={(event) => {
                this.setState({ password: event.target.value });
            }}
          />
          <div>
            <h3>Name</h3>
            <input type="text" onChange={e => this.handleNameInput(e)}/>
          </div>
          <div>
            <h3>Age</h3>
            <input type="text" onChange={e => this.handleAgeInput(e)}/>
          </div>
          <div>
            <h3>Gender</h3>
            <select onChange={e => this.handleSelectedGender}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            </select>
          </div>
          <div>
            <h3>Start Weight</h3>
            <input type="text" onChange={e => this.handleStartWeight(e)}/>
          </div>
          <div>
            <h3>Goal Weight</h3>
            <input type="text" onChange={e => this.handleGoalWeight(e)}/>
          </div>
  
          <button onClick={this.createAccount}> Create Account </button>
          <button onClick={this.loginUser}>Login</button>
          <button onClick={this.signOutUser}>Sign Out</button>
        </div>
      );
    }
  }