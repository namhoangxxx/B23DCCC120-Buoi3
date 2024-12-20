import React from 'react';
import { Button } from './Button';
import { Item } from '/Types';

interface TableProps {
  items: Item[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  editingItem: Item | null;
  onSave: () => void;
  onEditChange: (field: keyof Item, value: string) => void;
}

export const Table: React.FC<TableProps> = React.memo(({
  items,
  onEdit,
  onDelete,
  editingItem,
  onSave,
  onEditChange,
}) => (
  <table className="data-table">
    <thead>
      <tr>
        <th>Tên</th>
        <th>Giá</th>
        <th>Thao tác</th>
      </tr>
    </thead>
    <tbody>
      {items.map(item => (
        <tr key={item.id}>
          <td>
            {editingItem?.id === item.id ? (
              <input
                value={editingItem.name}
                onChange={(e) => onEditChange('name', e.target.value)}
              />
            ) : item.name}
          </td>
          <td>
            {editingItem?.id === item.id ? (
              <input
                type="number"
                value={editingItem.price}
                onChange={(e) => onEditChange('price', e.target.value)}
              />
            ) : item.price}
          </td>
          <td>
            {editingItem?.id === item.id ? (
              <Button className="edit-button" onClick={onSave}>
                Lưu
              </Button>
            ) : (
              <Button className="edit-button" onClick={() => onEdit(item.id)}>
                Chỉnh sửa
              </Button>
            )}
            <Button className="delete-button" onClick={() => onDelete(item.id)}>
              Xóa
            </Button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
)); 