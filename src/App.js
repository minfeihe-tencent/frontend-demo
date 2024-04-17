import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './login';
import Register from './register';
import logo from './images/tencent-cloud-logo.png';
import { UserProvider } from './userContext';

const App = () => {
  return (
    <div className="App">
      <div className="App-header">
        <div className="logo-container">
          <img src={logo} alt="Tencent Cloud Logo" className="App-logo" />
        </div>
        <div className="header-container">
          <h1>Internation Service and Technical Support Center Login Service</h1>
        </div>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={      
            <UserProvider>
              <Login />
            </UserProvider>} /> 
          <Route path="/register" element={<Register />} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
