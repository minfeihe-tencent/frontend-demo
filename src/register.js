import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [registrationMessage, setRegistrationMessage] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const backToLogin = (event) => {
    event.preventDefault();
    navigate('/');
    console.log('Clicked register button, goes to register form');
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    const url = `http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/register`;
    const data = {
        username: username,
        password: password,
    };
    const method = 'POST';
    const headers = {
      'Content-Type': 'application/json'
    };
    const options = {
      method,
      headers,
      body: JSON.stringify(data)
    };
    try {
        const response = await fetch(url, options);
        if (response.ok) {
          setRegistrationMessage('You have registered');
        } else if (response.status === 400) {
          setRegistrationMessage('The user has existed, please try a different username');
        } else {
          setRegistrationMessage('Unknown error');
        }
      } catch (error) {
        console.error('Error registering user:', error);
        setRegistrationMessage('Registration failed. Please try again.');
      }
    console.log('Submitted login form:', username, password);
  };

  return (
    <div className="login-container">
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="username">Username:</label>
                <div className="input-container">
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={handleUsernameChange}
                        required
                    /><br />
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <div className="input-container">
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    /><br />
                </div>
            </div>
            <div className="button-container">
                <button className="primary-button">Submit</button>
            </div>
            <div className="button-container">
                <button className="secondary-button" onClick={backToLogin}>Back to Login</button>
            </div>
        </form>
        {registrationMessage && <p>{registrationMessage}</p>}
    </div>
  );
};

export default Register;
