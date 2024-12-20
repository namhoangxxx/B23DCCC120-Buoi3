import { useState } from 'react';
import './App.css';

function App() {
  const [items, setItems] = useState([
    { id: 1, name: 'Tổng số', price: 0 }
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItem, setNewItem] = useState({ name: '', price: '' });
  const [editingItem, setEditingItem] = useState(null);

  const handleAdd = () => {
    if (newItem.name && newItem.price) {
      setItems([...items, {
        id: items.length + 1,
        name: newItem.name,
        price: Number(newItem.price)
      }]);
      setNewItem({ name: '', price: '' });
      setShowAddModal(false);
    }
  };

  const handleEdit = (id) => {
    const item = items.find(item => item.id === id);
    setEditingItem(item);
  };

  const handleSaveEdit = () => {
    if (editingItem) {
      setItems(items.map(item => 
        item.id === editingItem.id ? editingItem : item
      ));
      setEditingItem(null);
    }
  };

  const handleDelete = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Bảng Thông Tin</h1>
      
      <button className="add-button" onClick={() => setShowAddModal(true)}>
        Thêm Hàng Hóa
      </button>
      
      <div className="search-box">
        <input 
          type="text" 
          placeholder="Tìm kiếm..." 
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>Tên</th>
            <th>Giá</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map(item => (
            <tr key={item.id}>
              <td>
                {editingItem?.id === item.id ? (
                  <input
                    value={editingItem.name}
                    onChange={(e) => setEditingItem({...editingItem, name: e.target.value})}
                  />
                ) : item.name}
              </td>
              <td>
                {editingItem?.id === item.id ? (
                  <input
                    type="number"
                    value={editingItem.price}
                    onChange={(e) => setEditingItem({...editingItem, price: e.target.value})}
                  />
                ) : item.price}
              </td>
              <td>
                {editingItem?.id === item.id ? (
                  <button className="edit-button" onClick={handleSaveEdit}>
                    Lưu
                  </button>
                ) : (
                  <button className="edit-button" onClick={() => handleEdit(item.id)}>
                    Chỉnh sửa
                  </button>
                )}
                <button className="delete-button" onClick={() => handleDelete(item.id)}>
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showAddModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Thêm Hàng Hóa Mới</h2>
            <input
              placeholder="Tên hàng hóa"
              value={newItem.name}
              onChange={(e) => setNewItem({...newItem, name: e.target.value})}
            />
            <input
              type="number"
              placeholder="Giá"
              value={newItem.price}
              onChange={(e) => setNewItem({...newItem, price: e.target.value})}
            />
            <div className="modal-buttons">
              <button onClick={handleAdd}>Thêm</button>
              <button onClick={() => setShowAddModal(false)}>Hủy</button>
            </div>
          </div>
        </div>
      )}

      <div className="pagination">
        <button className="page-button" disabled={currentPage === 1}>
          Trước
        </button>
        <span>Trang {currentPage}/1</span>
        <button className="page-button" disabled={true}>
          Sau
        </button>
      </div>
    </div>
  );
}

export default App;
