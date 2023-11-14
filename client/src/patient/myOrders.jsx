import React, { useState, useEffect } from 'react';
import MyOrderCard from '../shared/components/OrderCard/MyOrderCard';
import Typography from '@mui/joy/Typography';


function MyOrders() {
  const [orders, setOrders] = useState([]);
  
  //testing
  useEffect(() => {
    const fetchedOrders = [
      {
        //id: 1,
        totalAmount: 50.00,
        cartItems: [
          { name: 'Paracetamol', description: 'Description 1', price: 10.00, quantity: 2 },
          { name: 'Aspirin', description: 'Description 2', price: 15.00, quantity: 1 }
        ]
      },
      {
        //id: 1,
        totalAmount: 50.00,
        cartItems: [
          { name: 'ONE', description: 'Description 1', price: 10.00, quantity: 2 },
          { name: 'TWO', description: 'Description 2', price: 15.00, quantity: 1 }
        ]
      },
    ];
    setOrders(fetchedOrders);
  }, []); 

  const orderr = orders.map((order) => {
    return (
        <MyOrderCard
            formattedDate
            status
            cartItems={order.cartItems}
            totalAmount
            sx
        />
    );
});


  return (
    <div>
      <Typography level="h1" sx={{ ml: 0.5 }} id="card-description"> My Orders </Typography>
      <div className="space-y-10">
        {orderr}
      </div>
              

    </div>
  );
}

export default MyOrders;
