import React, { Component } from 'react';
import firebase from './fire';
import Home from './component/Home/Home';
import Routes from './routes';


import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props){
    super(props)

    this.state = {
        checkAuth: false,
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
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Broken</h1>
        </header>
        <div>
          {this.state.checkAuth && <Routes userid={this.state.userid} />}
        </div>
      </div>
    );
  }
}

export default App;
