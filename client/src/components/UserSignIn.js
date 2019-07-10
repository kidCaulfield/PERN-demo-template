import React from 'react';

const UserSignUp = ({ onSignIn }) => {

  const handleSubmit = (event) => {
    event.preventDefault();
    const { currentTarget } = event;
    const formData = new FormData(currentTarget);

    onSignIn({
        email: formData.get("email"),
        password: formData.get("password")
    })
  }

  return (
    <div className="UserSignUp">
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit} className="form">
        <div>
          <label className="label" htmlFor="email">email</label><br/>
          <input className="input" type="email" name="email"></input>
        </div>
        <div>
          <label className="label" htmlFor="password">password</label><br/>
          <input className="input" type="password" name="password"></input>
        </div>
        <input className="button" type="submit" value="Sign In" />
      </form>
    </div>
  )
};

export default UserSignUp;