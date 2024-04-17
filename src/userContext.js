import React, { createContext, useState } from 'react';

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [registrationMessage, setRegistrationMessage] = useState('');

  const login = async(username, password) => {
    try {
        const url = `http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/login`;
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
        const response = await fetch(url, options);
        console.log(response);
        if (response.ok) {
          setUser(username);
          setIsAuthenticated(true);
          setRegistrationMessage('Logged in.');
        } else if (response.status === 404) {
          setRegistrationMessage('Username or password are incorrect.');
        } else {
          setRegistrationMessage('Registration failed. Please try again.');
        }
      } catch (error) {
        console.error('Error registering user:', error);
        setRegistrationMessage('Unknown error');
      }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setRegistrationMessage('');
  };

  return (
    <UserContext.Provider value={{ user, login, logout, isAuthenticated, registrationMessage }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
