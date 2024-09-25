import React, { useState, useContext } from 'react';
import '../Products/ProductForm.css'
import { ProductContext } from '../../context/ProductContext.jsx'; // Update the path as necessary

const ProductForm = () => {
  const { addProduct } = useContext(ProductContext);
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    category: '',
    images: [],
  });

  // Handle file input
  const handleFileChange = (e) => {
    setProductData({ ...productData, images: e.target.files });
  };

  // Handle text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addProduct(productData);
    setProductData({
      name: '',
      description: '',
      price: '',
      quantity: '',
      category: '',
      images: [],
    });
  };

  return (
    <div className="container py-5 mt-3">
      <div className="row d-flex justify-content-center">
        <div className="col-sm-12 col-md-8 col-lg-8 col-xl-8">
          <div className="container py-3 product-form-container">
            <div className="row d-flex justify-content-center">
              <div className="col-sm-10 col-md-8 col-lg-8 col-xl-8">
              <h2 className="text-center mb-3 add-product-text">Add Product</h2>
              <form onSubmit={handleSubmit} encType="multipart/form-data" className='product-form'>
                <div className="form-group mb-3">
                  <label htmlFor="name">Product Name</label>
                    <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={productData.name}
                    onChange={handleChange}
                    placeholder="Enter product name"
                    required
                    />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="description">Description</label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    value={productData.description}
                    onChange={handleChange}
                    placeholder="Enter product description"
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="price">Price</label>
                  <input
                    type="number"
                    className="form-control"
                    id="price"
                    name="price"
                    value={productData.price}
                    onChange={handleChange}
                    placeholder="Enter product price"
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="quantity">Quantity</label>
                  <input
                    type="number"
                    className="form-control"
                    id="quantity"
                    name="quantity"
                    value={productData.quantity}
                    onChange={handleChange}
                    placeholder="Enter available quantity"
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="category">Category</label>
                  <input
                    type="text"
                    className="form-control"
                    id="category"
                    name="category"
                    value={productData.category}
                    onChange={handleChange}
                    placeholder="Enter product category"
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="image">Image</label>
                  <input
                    type="file"
                    className="form-control"
                    id="image"
                    name="images"
                    multiple
                    onChange={handleFileChange}
                    required
                  />
                </div>
                <div className='d-flex justify-content-center'>
                  <button type="submit" className="btn btn-primary mt-2 mb-2">
                    Add Product
                  </button>
                </div>
        
              </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;

