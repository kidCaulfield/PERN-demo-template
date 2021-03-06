import React from 'react';


const UserSignUp = ({ onUserCreate }) => {

  const handleSubmit = (event) => {
    event.preventDefault();
    const { currentTarget } = event;
    const formData = new FormData(currentTarget);

    onUserCreate({
      users: {
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password"),
        password_digest: formData.get("password_digest")
      }
    })
  }

  return (
    <div className="UserSignUp">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} className="form">
        <div>
          <label className="label" htmlFor="username" >user Name</label><br/>
          <input type="text" className="input" name="username" />
        </div>
        <div>
          <label className="label" htmlFor="email">email</label><br/>
          <input className="input" type="email" name="email"></input>
        </div>
        <div>
          <label className="label" htmlFor="password">password</label><br/>
          <input className="input" type="password" name="password"></input>
        </div>
        <div>
          <label className="label" htmlFor="password_digest">confirm password</label><br/>
          <input className="input" type="password" name="password_digest"></input>
        </div>
        <input className="button" type="submit" value="Sign Up" />
      </form>
    </div>
  )
};

export default UserSignUp;