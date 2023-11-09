import React, { useState, useEffect } from 'react';
import './quantity.css';

const QuantityInput = ({ initialValue, onIncrement, onDecrement }) => {
  const [quantity, setQuantity] = useState(initialValue || 1);

  useEffect(() => {
    setQuantity(initialValue || 1);
  }, [initialValue]);

  const handleIncrement = () => {
    const newValue = quantity + 1;
    setQuantity(newValue);
    onIncrement && onIncrement(newValue);
  };

  const handleDecrement = () => {
    const newValue = quantity - 1;
    if (newValue >= 1) {
      setQuantity(newValue);
      onDecrement && onDecrement(newValue);
    }
  };

  return (
    <div className="quantity-input">
      <button className="quantity-button" onClick={handleDecrement}>
        -
      </button>
      <span className="quantity-text">{quantity}</span>
      <button className="quantity-button" onClick={handleIncrement}>
        +
      </button>
    </div>
  );
};

export default QuantityInput;
