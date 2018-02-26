import React, { Component } from 'react';
import firebase from './fire';
import Register from './component/Register/Register';
import Routes from './routes';


import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div>
          {Routes}
        </div>
      </div>
    );
  }
}

export default App;
