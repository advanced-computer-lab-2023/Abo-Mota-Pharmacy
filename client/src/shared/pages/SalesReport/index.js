import { useGetSalesReportsQuery } from "../../../store";
import LoadingIndicator from "../../components/LoadingIndicator";
import SearchBar from "../../components/SearchBar";
import { useState } from "react";
import {
  TextField,
  InputLabel,
  Typography,
  Divider,
  Card,
  Box,
} from "@mui/material";

const SalesReport = () => {
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const { data, isFetching, error } = useGetSalesReportsQuery();
  if (isFetching) {
    return <LoadingIndicator />;
  }

  const dateFilteredArray = data.filter((order) => {
    const toComp = order.purchaseDate.substring(0, 7);
    if (dateFilter === "") {
      return order.medicineId.name.toLowerCase().includes(search.toLowerCase());
    }
    return (
      dateFilter === toComp &&
      order.medicineId.name.toLowerCase().includes(search.toLowerCase())
    );
  });

  const obj = {};
  dateFilteredArray.forEach((order) => {
    const date = order.purchaseDate.substring(0, 7);
    if (obj[date] === undefined) {
      obj[date] = [];
    }
    obj[date].push(order);
  });

  const mappedArray = Object.keys(obj).map((key) => {
    console.log(obj[key]);
    const total = obj[key].reduce((acc, curr) => {
      console.log(curr.totalPrice);
      return acc + curr.medicineId.price * curr.sales;
    }, 0);
    const arr = obj[key].map((order, index) => {
      return (
        <div
          key={index}
          className='flex flex-col md:flex-row justify-between items-center mb-4 p-2 border-b last:border-b-0'
        >
          {/* Date */}
          <Typography
            variant='subtitle1'
            className='mb-2 md:mb-0 text-gray-600'
          >
            {order.purchaseDate.substring(8, 10)}{" "}
            {numberToMonth(parseInt(order.purchaseDate.substring(5, 7)))}
          </Typography>

          {/* Medicine Name */}
          <Typography
            variant='subtitle1'
            className='mb-2 md:mb-0 font-semibold text-gray-800'
          >
            {order.medicineId.name}
          </Typography>

          {/* Price */}
          <Typography
            variant='subtitle1'
            className='font-semibold text-blue-600'
          >
            ${order.medicineId.price * order.sales}
          </Typography>
        </div>
      );
    });
    return (
      <Card className='mb-5 bg-white text-black'>
        <Box className='p-4 flex justify-between items-center'>
          <Typography
            variant='h5'
            component='div'
            fontWeight={500}
            className='text-l'
          >
            {numberToMonth(parseInt(key.substring(5, 7)))} {key.substring(0, 4)}
          </Typography>

          <Typography
            variant='h5'
            component='div'
            fontWeight={500}
            className='text-s'
          >
            Total Sales: {total}
          </Typography>
        </Box>
        <Divider />
        <Box className='p-4'>{arr}</Box>
      </Card>
    );
  });

  return (
    <div className='p-4'>
      <h1 className='text-4xl font-bold mb-4'>Sales Report</h1>

      {/* Search Bar */}
      <div className='flex flex-wrap gap-4 mb-4'>
        {/* Search Bar */}
        <TextField
          className='flex-grow bg-white'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          label='Search Medicine'
          variant='outlined'
        />

        {/* Date Input */}
        <div className='flex-grow'>
          <TextField
            type='month'
            id='dateInput'
            label='Choose A Month'
            variant='outlined'
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className='w-full bg-white'
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
      </div>

      <Divider sx={{ my: 2 }} />

      {/* Mapped Array Content */}
      <div>{mappedArray}</div>
    </div>
  );
};

function numberToMonth(number) {
  switch (number) {
    case 1:
      return "January";
    case 2:
      return "February";
    case 3:
      return "March";
    case 4:
      return "April";
    case 5:
      return "May";
    case 6:
      return "June";
    case 7:
      return "July";
    case 8:
      return "August";
    case 9:
      return "September";
    case 10:
      return "October";
    case 11:
      return "November";
    case 12:
      return "December";
    default:
      return "Invalid month number"; // or throw an error
  }
}

export default SalesReport;
