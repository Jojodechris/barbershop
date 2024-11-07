// Front end signupForm.js



import Axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Home from './Home';
// import "./login.css";
// import LogsignHeader from './LogsignHeader';



function SignupForm() {
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
  
    if (isInvalid || !formData.type) {
      setSignupStatus('All fields are required.');
      return;
    }
  
    try {
      // if (formData.type == "barber" || formData.type == "customer") {
      const response = await Axios.post("http://localhost:3001/signup", formData);
      if (response.data.message) {
        alert(`Signup successful! You can now login as a ${formData.type}, ${formData.username}.`);
        setFormData({ username: '', password: '', type: '' });
        navigate('/login');
      } else {
        setSignupStatus('Failed to sign up.');
      // }
    }
    } catch (error) {
      console.error(error);
      // console.log(response,"response")
      setSignupStatus('An error occurred during signup.');
    }
  };
  
  return (
    
    <div className="bigcontainer">
      <div className="form-container">
        <form className="form" onSubmit={handleSignup}>
          <h2 className="form-header">CREATE AN ACCOUNT</h2>
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
            Signup
          </button>
          {/* <p>Already a user? <Link to="/login">Login</Link></p> */}
        </form>
        <h2>Already a user? <Link to="/login">Login</Link></h2>
      </div>
    </div>
  );
}

export default SignupForm;
