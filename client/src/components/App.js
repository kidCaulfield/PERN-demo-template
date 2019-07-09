import React, { useState, useEffect } from 'react';
import logo from '../logo.svg';
import '../styles/App.css';
import SignUp from './UserSignUp';
import SignIn from './UserSignIn';
import { User, Session } from '../requests';

function App() {
  let [currentUser, setCurrentUser] = useState(null);
  let [loading, setLoading] = useState(false);

  const createUser = async params => {
    const user = await User.create(params);
    if (typeof user.id === 'number') {
      const session = await Session.create({
        email: params.users.email,
        password: params.users.password,
      });
      setCurrentUser(session);
    }
  };

  const signIn = async params => {
    const session = await Session.create(params);
    setCurrentUser(session);
  };

  const signOut = async () => {
    const destroy = await Session.destroy();
    setCurrentUser(null);
    console.log('destroy: ', destroy);
  };

  const findSession = async () => {
    const session = await Session.getCurrentSession();
    setCurrentUser(session);
    setLoading(true);
  };

  useEffect(() => {
    findSession();
  }, []);

  if (!loading) {
    return <div className="App" />;
  }

  if (!currentUser) {
    return (
      <div className="App">
        <main className="App-main">
          <img src={logo} className="App-logo" alt="logo" />
          <div className="layout">
            <SignUp onUserCreate={createUser} />
            <div
              style={{
                margin: '2em',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <div
                style={{
                  backgroundColor: 'white',
                  height: '3em',
                  width: '2px',
                }}
              />
              <h2>or</h2>
              <div
                style={{
                  backgroundColor: 'white',
                  height: '3em',
                  width: '2px',
                }}
              />
            </div>
            <SignIn onSignIn={signIn} />
          </div>
        </main>
      </div>
    );
  }

  if (currentUser) {
    return (
      <main className="App-main">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>{currentUser.username}</h1>
        <button className="button" onClick={signOut}>
          Sign Out
        </button>
      </main>
    );
  }
}

export default App;
