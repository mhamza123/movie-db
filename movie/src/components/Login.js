import React, { useState } from 'react';
import "../styles/Login.css";
import { Link, useHistory } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const history = useHistory();
  const database = [
    {
      username: "hello",
      password: "p"
    },
    {
      username: "mehak",
      password: "mehak"
    }
  ];

  const errors = {
    uname: "invalid username",
    pass: "invalid password"
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { uname, pass } = event.target.elements;
    const userData = database.find((user) => user.username === uname.value);

    if (userData) {
      if (userData.password !== pass.value) {
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        setIsSubmitted(true);
        onLogin(userData.username);
        history.push('/home');
      }
    } else {
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  };

  const handleLogout = () => {
    setIsSubmitted(false);
    history.push('/login');
  };

  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
          {renderErrorMessage("pass")}
          <button className="submit" type="submit">Sign In</button>
        </div>
        <br />
        <div className="have-account">
          <span>Don't have an account? </span>
          <button className="signup" onClick={() => history.push('/create-account')}>Sign Up</button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Login</div>
        {isSubmitted ? (
          <div>
            <div>User is successfully logged in</div>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          renderForm
        )}
      </div>
    </div>
  );
};

export default Login;
