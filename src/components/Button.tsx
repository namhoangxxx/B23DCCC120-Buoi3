import React from 'react';

interface ButtonProps {
  onClick: () => void;
  className?: string;
  disabled?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  onClick, 
  className, 
  disabled, 
  children 
}) => (
  <button
    className={className}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
); 
  
  );
}

export default AddProduct;
