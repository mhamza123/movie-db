import React, { useState } from 'react';
import "./styles/Login.css";
import { Link, useHistory } from 'react-router-dom';
import backgroundImage from '../img/movie.jpg'
import Home from './components/Home';

const Login = ({ onLogin }) => {
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [username, setUsername] = useState("");
  const history = useHistory();

  const handleLogin = (event) => {
    event.preventDefault();
  
    const { uname, pass } = event.target.elements;
  
    // Send login data to Django API for authentication
    fetch('http://localhost:8000/backend/api/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: uname.value,
        password: pass.value,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json(); // Parse the response as JSON
        } else if (response.status === 401) {
          setErrorMessages({ uname: "Invalid username or password", pass: "Invalid username or password" });
          throw new Error("Invalid username or password");
        } else {
          throw new Error('Something went wrong.');
        }
      })
      .then((data) => {
        if (data.authenticated) {
          localStorage.setItem('username', uname.value);
          setIsSubmitted(true);
          onLogin(uname.value); // Assuming the response contains the username
          // localStorage.setItem('token', data.access);
          history.push('/home');
        } else {
          setErrorMessages({ uname: "Invalid username or password", pass: "Invalid username or password" });
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleRegistration = (event) => {
    event.preventDefault();

    const { regUname, regPass, regEmail } = event.target.elements;

    // Create a new user object
    const newUser = {
      username: regUname.value,
      password: regPass.value,
      email: regEmail.value,
      // Add more fields as needed
    };

    // Send the new user data to the Django API
    fetch('http://localhost:8000/backend/api/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => {
        if (response.ok) {
          setErrorMessages({});
          setIsLoginForm(true);
          // Display a success message or redirect to login after successful registration
        } else if (response.status === 400) {
          response.json().then((data) => {
            const errorFields = Object.keys(data);
            const errorMessages = errorFields.reduce((acc, field) => {
              acc[field] = data[field][0];
              return acc;
            }, {});
            setErrorMessages(errorMessages);
          });
        } else {
          throw new Error('Something went wrong.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const renderLoginForm = (
    <div className="form">
      <form onSubmit={handleLogin}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" required />
          {errorMessages.uname && <div className="error">{errorMessages.uname}</div>}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
          {errorMessages.pass && <div className="error">{errorMessages.pass}</div>}
        </div>
        <br />
        <button className="submit" type="submit">Sign In</button>
      </form>
    </div>
  );

  const renderRegistrationForm = (
    <div className="form">
      <form onSubmit={handleRegistration}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="regUname" required />
          {errorMessages.regUname && <div className="error">{errorMessages.regUname}</div>}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="regPass" required />
          {errorMessages.regPass && <div className="error">{errorMessages.regPass}</div>}
        </div>
        <div className="input-container">
          <label>Email </label>
          <input type="email" name="regEmail" required />
          {errorMessages.regEmail && <div className="error">{errorMessages.regEmail}</div>}
        </div>
        <br />
        <button className="submit" type="submit">Register</button>
      </form>
    </div>
  );

  return (
    <div className="wrapper">
      <div className="app">
        <div className="login-form">
          <div className="title">
            {isLoginForm ? 'Login' : 'Register'}
          </div>
          {isLoginForm ? (
            isSubmitted ? (
              history.push('/home')
            ) : (
              renderLoginForm
            )
          ) : (
            renderRegistrationForm
          )}
          <div className="toggle-form">
            {isLoginForm ? (
              <span>
                Don't have an account?{' '}
                <button className="toggle-btn" onClick={() => setIsLoginForm(false)}>Register</button>
              </span>
            ) : (
              <span>
                Already have an account?{' '}
                <button className="toggle-btn" onClick={() => setIsLoginForm(true)}>Login</button>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
