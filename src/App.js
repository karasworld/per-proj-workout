import React, { Component } from 'react';
import firebase from './fire';

import Routes from './routes';


import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props){
    super(props)

    this.state = {
        checkAuth: true,
        userid: ''
    };
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
            <h1>CUSTOM FIT ONLINE</h1>
            <hr/ >
            <h4 className="tag-main">For you, By you</h4>
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
