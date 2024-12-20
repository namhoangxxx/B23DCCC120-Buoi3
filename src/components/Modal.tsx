import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EditProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState({
    name: '',
    price: '',
    quantity: ''
  });

  useEffect(() => {
    // Lấy danh sách sản phẩm từ localStorage
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    // Tìm sản phẩm cần sửa
    const productToEdit = products.find(p => p.id === Number(id));
    if (productToEdit) {
      setProduct(productToEdit);
    } else {
      navigate('/'); // Nếu không tìm thấy sản phẩm, chuyển về trang chủ
    }
  }, [id, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Lấy danh sách sản phẩm từ localStorage
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    
    // Cập nhật sản phẩm trong danh sách
    const updatedProducts = products.map(p => 
      p.id === Number(id) ? {
        ...product,
        price: Number(product.price),
        quantity: Number(product.quantity)
      } : p
    );
    
    // Lưu danh sách đã cập nhật vào localStorage
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    
    navigate('/');
  };

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="edit-product">
      <h2>Chỉnh Sửa Sản Phẩm</h2>
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
        <button type="submit">Lưu Thay Đổi</button>
      </form>
    </div>
  );
}

export default EditProduct; 