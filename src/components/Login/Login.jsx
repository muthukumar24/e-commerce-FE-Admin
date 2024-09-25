import React, { useState, useContext } from 'react';
import '../Login/Login.css'
import { useNavigate } from 'react-router-dom';
import { EcommerceAuthContext } from '../../context/AuthContext';

const LoginForm = () => {
  const { login } = useContext(EcommerceAuthContext);
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(credentials);
      navigate('/home'); // Redirect to home page upon successful login
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="container-fluid mt-5">

    <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-sm-12 col-md-8 col-lg-6 col-xl-5">
            <div className="container py-5" id="login-form-container">
              <div className="row justify-content-center">
                <div className="col-sm-10 col-md-10 col-lg-9 col-xl-10">
                <h2 className="text-center mb-3 admin-text">Admin Login</h2>
          <form onSubmit={handleSubmit} id="login-form">
            <div className="form-group mb-3">
              <label htmlFor="email" className='mb-1'>Email</label>
              <input
                type="email"
                className="form-control email-input"
                id="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                placeholder="Enter email"
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="password" className='mb-1'>Password</label>
              <input
                type="password"
                className="form-control password-input mb-4"
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
              />
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <button type="submit" className="btn btn-primary w-100 login-btn py-2">
              Login
            </button>
          </form>
                </div>
              </div>
            </div>
          </div>
       </div>
       </div>
    </div>
  );
};

export default LoginForm;
