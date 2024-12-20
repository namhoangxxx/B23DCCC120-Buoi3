import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddProduct() {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    price: '',
    quantity: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Đọc danh sách sản phẩm hiện có từ localStorage
    const existingProducts = JSON.parse(localStorage.getItem('products') || '[]');
    
    // Tạo sản phẩm mới với ID tự động tăng
    const newProduct = {
      ...product,
      id: existingProducts.length > 0 
        ? Math.max(...existingProducts.map(p => p.id)) + 1 
        : 1,
      price: Number(product.price),
      quantity: Number(product.quantity)
    };
    
    // Thêm sản phẩm mới vào danh sách
    const updatedProducts = [...existingProducts, newProduct];
    
    // Lưu danh sách mới vào localStorage
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    
    console.log('Sản phẩm mới:', newProduct);
    navigate('/');
  };

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="add-product">
      <h2>Thêm Sản Phẩm Mới</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Tên Sản Phẩm:</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Giá:</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Số Lượng:</label>
          <input
            type="number"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Thêm Sản Phẩm</button>
      </form>
    </div>
  );
}

export default AddProduct;