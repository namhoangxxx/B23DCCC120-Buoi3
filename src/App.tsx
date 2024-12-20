import React, { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { RootState } from './store/store';
import { addItem, updateItem, deleteItem } from './store/itemSlice';
import { Item } from './types';
import { Table } from './components/Table';
import { Modal } from './components/Modal';
import { Button } from './components/Button';
import './App.css';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.items.items);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItem, setNewItem] = useState<Omit<Item, 'id'>>({ name: '', price: 0 });
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [currentPage] = useState(1);

  const filteredItems = useMemo(() => 
    items.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    [items, searchTerm]
  );

  const handleAdd = () => {
    if (newItem.name && newItem.price) {
      dispatch(addItem({
        id: items.length + 1,
        ...newItem
      }));
      setNewItem({ name: '', price: 0 });
      setShowAddModal(false);
    }
  };

  const handleEdit = (id: number) => {
    const item = items.find(item => item.id === id);
    if (item) setEditingItem(item);
  };

  const handleSaveEdit = () => {
    if (editingItem) {
      dispatch(updateItem(editingItem));
      setEditingItem(null);
    }
  };

  const handleEditChange = (field: keyof Item, value: string) => {
    if (editingItem) {
      setEditingItem({
        ...editingItem,
        [field]: field === 'price' ? Number(value) : value
      });
    }
  };

  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={
            <>
              <h1>Bảng Thông Tin</h1>
              
              <Button 
                className="add-button" 
                onClick={() => setShowAddModal(true)}
              >
                Thêm Hàng Hóa
              </Button>
              
              <div className="search-box">
                <input 
                  type="text" 
                  placeholder="Tìm kiếm..." 
                  className="search-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <Table
                items={filteredItems}
                onEdit={handleEdit}
                onDelete={(id) => dispatch(deleteItem(id))}
                editingItem={editingItem}
                onSave={handleSaveEdit}
                onEditChange={handleEditChange}
              />

              {showAddModal && (
                <Modal
                  title="Thêm Hàng Hóa Mới"
                  onClose={() => setShowAddModal(false)}
                  onSubmit={handleAdd}
                >
                  <input
                    placeholder="Tên hàng hóa"
                    value={newItem.name}
                    onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                  />
                  <input
                    type="number"
                    placeholder="Giá"
                    value={newItem.price}
                    onChange={(e) => setNewItem({...newItem, price: Number(e.target.value)})}
                  />
                </Modal>
              )}

              <div className="pagination">
                <Button 
                  className="page-button" 
                  disabled={currentPage === 1}
                >
                  Trước
                </Button>
                <span>Trang {currentPage}/1</span>
                <Button 
                  className="page-button" 
                  disabled={true}
                >
                  Sau
                </Button>
              </div>
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
};

export default App; 
