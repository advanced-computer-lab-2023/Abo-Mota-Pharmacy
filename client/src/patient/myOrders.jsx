import React, { useState, useEffect } from 'react';
import MyOrderCard from '../shared/components/OrderCard/MyOrderCard';
import Typography from '@mui/joy/Typography';
import { useGetOrdersQuery } from '../store';


function MyOrders() {
  // const [orders, setOrders] = useState([]);

  // //testing
  // useEffect(() => {
  //   const fetchedOrders = [
  //     {
  //       //id: 1,
  //       totalAmount: 50.00,
  //       cartItems: [
  //         { name: 'Paracetamol', description: 'Description 1', price: 10.00, quantity: 2 },
  //         { name: 'Aspirin', description: 'Description 2', price: 15.00, quantity: 1 }
  //       ]
  //     },
  //     {
  //       //id: 1,
  //       totalAmount: 50.00,
  //       cartItems: [
  //         { name: 'ONE', description: 'Description 1', price: 10.00, quantity: 2 },
  //         { name: 'TWO', description: 'Description 2', price: 15.00, quantity: 1 }
  //       ]
  //     },
  //   ];
  //   setOrders(fetchedOrders);
  // }, []); 

  const { data: orders, isFetching, error } = useGetOrdersQuery();

  if (isFetching) return <div>Loading...</div>;

  console.log("Orders @ MyOrders.jsx", orders)

  const renderedOrders = orders.map((order) => {
    return (
      <MyOrderCard
        formattedDate
        status
        cartItems={order.medicines}
        totalAmount
        sx
      />
    );
  });


  return (
    <div>
      <Typography level="h1" sx={{ ml: 0.5 }} id="card-description"> My Orders </Typography>
      <div className="space-y-10">
        {renderedOrders}
      </div>


    </div>
  );
}

export default MyOrders;
