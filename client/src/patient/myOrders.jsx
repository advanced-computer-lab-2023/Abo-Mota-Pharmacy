import React, { useState, useEffect } from "react";
import MyOrderCard from "../shared/components/OrderCard/MyOrderCard";
import Typography from "@mui/joy/Typography";
import { useGetOrdersQuery, useCancelOrderMutation } from "../store";
import dayjs from "dayjs";
import Box from "@mui/joy/Box";
import LoadingIndicator from "../shared/components/LoadingIndicator";
import { DatePicker } from "antd";

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
  const [selectedDate, setSelectedDate] = useState(null);
  const handelDateChange = (date) => {
    const formattedChosenDate = dayjs(date).format("MM/DD/YYYY");
    if (formattedChosenDate === "Invalid Date") {
      setSelectedDate(null);
      return;
    }
    setSelectedDate(formattedChosenDate);
    // console.log(formattedChosenDate);
  };
  if (isFetching) return <LoadingIndicator />;

  console.log("Orders @ MyOrders.jsx", orders);
  let filteredOrders = orders;
  if (selectedDate !== null) {
    filteredOrders = orders.filter((order) => {
      console.log("order.formattedDate", order.formattedDate);
      return order.formattedDate.split(",")[0] === selectedDate;
    });
  } else {
    filteredOrders = orders;
  }

  const renderedOrders = filteredOrders.map((order) => {
    return (
      <MyOrderCard
        formattedDate={order.formattedDate}
        cartItems={order.medicines}
        totalAmount={order.totalPrice}
        sx
        orderId={order._id}
        status={order.status}
      />
    );
  });

  return (
    <div>
      <Typography level="h1" sx={{ ml: 0.5 }} id="card-description">
        {" "}
        My Orders{" "}
      </Typography>
      {orders.length !== 0 ? (
        <Box className="space-y-5">
          <DatePicker format="MM/DD/YYYY" onChange={handelDateChange} style={{ width: "20%" }} />
          {renderedOrders.length !== 0 ? (
            <div className="space-y-10">{renderedOrders}</div>
          ) : (
            <Typography variant="h6">No Orders on {selectedDate}</Typography>
          )}
        </Box>
      ) : (
        <Typography variant="h6">No Orders</Typography>
      )}
    </div>
  );
}

export default MyOrders;
