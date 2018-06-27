import React, { Component } from 'react';
import axios from 'axios';
import firebase from './fire';
import {Link} from 'react-router-dom';
import Routes from './routes';


import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props){
    super(props)

    this.state = {
        checkAuth: true,
        userid: '',
       
    };

    this.signOutUser = this.signOutUser.bind(this);
}

signOutUser() {
  firebase.auth().signOut();

  axios
  .get('/api/signout')
  .then(response=>{
      console.log("Signed Out");
      this.props.history.push("/");
  })
  .catch(error=>{console.log(error)
  })    
}

  componentDidMount() {
    firebase.auth().onAuthStateChanged((result) => {
      if (result) {
        this.setState({ userid: result.uid, checkAuth: true });
      } else {
        this.setState({ checkAuth: true });
      }
    });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div>
            <Link to = "/" style={{textDecoration:'none', color:'rgb(71,71,71)'}}>
            <h1>CUSTOM FIT ONLINE</h1>
            </Link>
            <hr/ >
            <h4 className="tag-main">For you, By you</h4>
            </div> 
            <div>
                <Link to= "/">
                <button onClick={this.signOutUser}>Sign Out</button>
                </Link>
                </div>         
        </header>
        <div>
          {this.state.checkAuth && <Routes userid={this.state.userid} />}
        </div>
      </div>
    );
  }
}

export default App;
