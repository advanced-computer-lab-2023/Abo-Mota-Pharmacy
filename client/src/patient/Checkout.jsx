import React, { useState } from 'react';

import { useLocation } from 'react-router-dom';


const Checkout = () => {
  const savedAddresses = ['Address 1', 'Address 2', 'Address 3'];
  

  const location = useLocation();
  const {totalAmount,cartItems}=location.state
  //const queryParams = new URLSearchParams(location.search);
  //const totalAmount = queryParams.get('total');

  //array of each purchased item and the quantity purchsed to be deducted from "availableQuantity" AND added to "sold" in db
  const itemsAndQuantities = cartItems.map(item => [item.name, item.quantity]);

    

  return (
    <div>
       
        <h1 style={{ textAlign: 'center' }}>Checkout</h1>
        
         
    </div>
  );
};

export default Checkout;





