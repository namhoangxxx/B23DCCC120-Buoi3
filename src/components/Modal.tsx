import React from 'react';
import { Button } from './Button';

interface ModalProps {
  title: string;
  onClose: () => void;
  onSubmit: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  title,
  onClose,
  onSubmit,
  children,
}) => (
  <div className="modal">
    <div className="modal-content">
      <h2>{title}</h2>
      {children}
      <div className="modal-buttons">
        <Button onClick={onSubmit}>Thêm</Button>
        <Button onClick={onClose}>Hủy</Button>
      </div>
    </div>
  </div>
); 
