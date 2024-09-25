import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { EcommerceAuthContext } from '../context/AuthContext';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const { user } = useContext(EcommerceAuthContext);
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const response = await axios.get('https://e-commerce-be-6jj0.onrender.com/api/products', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const addProduct = async (newProduct) => {
    if (user.role !== 'admin') {
      console.error('Access denied: Only admins can add products.');
      return;
    }

    try {
      const formData = new FormData();

      // Append other non-file fields
      for (const key in newProduct) {
        if (key !== 'images') {
          formData.append(key, newProduct[key]);
        }
      }

      // Append image files
      if (newProduct.images) {
        for (let i = 0; i < newProduct.images.length; i++) {
          formData.append('images', newProduct.images[i]);
        }
      }

      const response = await axios.post('http://localhost:3000/api/products', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setProducts([...products, response.data]);
      alert('Product added successfully!');
    } catch (error) {
      console.error('Error adding product:', error.response ? error.response.data : error.message);
      alert('Error adding product.');
    }
  };

  const getInventoryById = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.get(`http://localhost:3000/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching product by ID:', error.response ? error.response.data : error.message);
      throw error;
    }
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, getInventoryById }}>
      {children}
    </ProductContext.Provider>
  );
};
