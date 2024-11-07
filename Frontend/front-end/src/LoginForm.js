// Loginform.js

import Axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';



function LoginForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ username: '', password: '', type: '' });
    const [signupStatus, setSignupStatus] = useState('');
    const [isInvalid, setIsInvalid] = useState(false);
    
    const handleChange = e => {
      const { name, value } = e.target;
      setFormData(data => ({ ...data, [name]: value }));
      setIsInvalid(value === '');
    }
    
    const handleSignup = async (e) => {
      e.preventDefault();
    
      if (isInvalid) {
        setSignupStatus('All fields are required.');
        return;
      }
    
      try {
        const response = await Axios.post("http://localhost:3001/login", formData);
    
        console.log(response.data.message, "message");
    
        if (response.data.message.includes("Login successful")) {
          alert(`Login successful! Welcome ${formData.username}.`);
          setFormData({ username: '', password: '', type: '' });
    
          if (response.data.message.includes("customer")) {
            navigate('/customer');
          } else if (response.data.message.includes("barber")) {
            navigate('/barber');
          }
        } else {
          setSignupStatus('Failed to log in.');
        }
      } catch (error) {
        console.error(error);
        setSignupStatus('An error occurred');
      }
    };
    
    
    return (
      <div className="bigcontainer">
        <div className="form-container">
          <form className="form" onSubmit={handleSignup}>
            <h2 className="form-header">LOGIN</h2>
            <div className="error-message">{signupStatus}</div>
            <div className="form-group">
              <label className="form-label">Username:</label>
              <input
                className="form-input"
                type="text"
                name="username"
                value={formData.username}
                autoComplete="on"
                onChange={handleChange}
              />
              {isInvalid && formData.username === '' && <div className="invalid-feedback">Username cannot be blank☹️.</div>}
            </div>
            <div className="form-group">
              <label className="form-label">Password:</label>
              <input
                className="form-input"
                type="password"
                name="password"
                value={formData.password}
                autoComplete="on"
                onChange={handleChange}
              />
              {isInvalid && formData.password === '' && <div className="invalid-feedback">Password cannot be blank☹️.</div>}
            </div>
            <div className="form-group">
            <label className="form-label">I am a:</label>
            <select
              className="form-input"
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="">Select user type</option>
              <option value="customer">Customer</option>
              <option value="barber">Barber</option>
            </select>
            {!formData.type && <div className="invalid-feedback">Please select a user type.</div>}
          </div>
            <button className="form-button" type="submit">
              Login
            </button>
            {/* <p>Already a user? <Link to="/login">Login</Link></p> */}
          </form>
          <h2>New user? <Link to="/signup">Create an account</Link></h2>
        </div>
      </div>
    );
  }
  
  export default LoginForm;