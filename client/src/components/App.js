import React from 'react';
import logo from '../logo.svg';
import '../styles/App.css';
import SignUp from './UserSignUp';

function App() {
  return (
    <div className="App">
      <main className="App-main">
        <img src={logo} className="App-logo" alt="logo" />
        <SignUp />
      </main>
    </div>
  );
}

export default App;
