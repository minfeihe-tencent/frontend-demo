import { UserContext } from './userContext';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { user, login, logout, isAuthenticated, registrationMessage } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    login(username, password);
  };

  const register = () => {
    navigate('/register');
    console.log('Clicked register button, goes to register form');
  };

  if (isAuthenticated) {
    return (
        <div>
          <div className='text-container'><h3>Welcome, {user}. Congrats you've done it.</h3></div>
          <div className="button-container">
            <button className="secondary-button" onClick={logout}>Logout</button>
          </div>
        </div>
    );
  } else {
    return (
      <div>
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
                  <button className="primary-button" >Login</button>
              </div>
              <div className="button-container">
                <button className="secondary-button" onClick={register}>Register</button>
              </div>
          </form>
          {registrationMessage && <p>{registrationMessage}</p>}
        </div>
      </div>
    );
  }
};

export default Login;
