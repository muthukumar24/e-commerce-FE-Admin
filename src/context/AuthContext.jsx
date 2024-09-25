import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const EcommerceAuthContext = createContext();

export const EcommerceAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get(
            'http://localhost:3000/api/auth/user/details',
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setUser(response.data);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', credentials);
      localStorage.setItem('token', response.data.token);
      const userResponse = await axios.get('http://localhost:3000/api/auth/user/details', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setUser(userResponse.data);
      setLoading(false);
    } catch (error) {
      console.log('Login Failed', error);
      alert('Invalid Credentials');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <EcommerceAuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </EcommerceAuthContext.Provider>
  );
};
