import React, { useState, useEffect } from 'react';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Avatar from '@mui/joy/Avatar';
import IconButton from '@mui/joy/IconButton';
import Divider from '@mui/joy/Divider';
import Box from '@mui/joy/Box';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { BiChat } from "react-icons/bi";
import AspirinImg from "../../assets/aspirin.jpg"
import Chip from '@mui/joy/Chip';
import capitalize from '../../utils/capitalize';
import OrderItems from "../OrderItems";
import Button from '@mui/material/Button';
import AlertDialogSlide from '../Alert';


function MyOrderCard({ sx, formattedDate, cartItems, totalAmount }) {
  //testing
  const formDate = "11-02-2023";
  const total = "50.00";
  //
  const [status, setStatus] = useState('pending');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);


  const colors = {
    "pending": "warning",
    "cancelled": "danger",
    "completed": "success"
  }

  const currentDate = new Date();
  const formattedCurrentDate = currentDate.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  });

  //formattedDate is hardcoded for testing named "formDate" , ctrl+F w ghayarooh fl code
  useEffect(() => {
    if (formattedCurrentDate > formDate) {
      setStatus('completed');
    }
  }, [formattedCurrentDate, formDate]);


  useEffect(() => {
    if (status !== "pending")
      setIsButtonDisabled(true);
  });


  const handleClick = () => {
    setDialogOpen(true);
  }
  const cancelOrder = () => {
    setStatus('cancelled');
    setIsButtonDisabled(true);
  };

  //testing
  const orderItems = cartItems.map((medicine) => {
    console.log("here: ", medicine.medicineImage);
    return (
        <OrderItems
            name={medicine.medicine.name}
            price={medicine.medicine.price}
            quantity={medicine.medicine.quantity}
            medicineImage={medicine.medicine.medicineImage}
        />
    );
  });

  const formattedStatus = capitalize(status);
  console.log(formattedStatus);
  return (
    <Card
      variant="outlined"
      orientation="horizontal"
      sx={{
        width: "100%",
        '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
        ...sx
      }}
    >
      <CardContent>
        <Box className="w-full">
          <Box className="flex w-full justify-between mb-1">
            <Typography
              level="body-lg"
              id="card-description"
            // startDecorator={<AccessTimeIcon fontSize='10' />}
            >
              Order
            </Typography>

            <Chip color={colors[status]} variant='soft'>
              <Typography level='title-lg'>
                {capitalize(status)}
              </Typography>
            </Chip>
          </Box>

          <Typography
            level="body-lg"
            aria-describedby="card-description"
            mb={1}
            startDecorator={<AccessTimeIcon fontSize='10' />}
          >
            {formDate.replace(",", " -")}
          </Typography>
        </Box>

        <Divider sx={{ marginBottom: 1.5 }} />

        <Box className="flex justify-flex-start space-x-10">
          {orderItems}

        </Box>
        <Typography
          level="body-lg"
          id="card-description"
        // startDecorator={<AccessTimeIcon fontSize='10' />}
        >
          Total: ${total}
        </Typography>
        <Button variant="outlined" color="error" disabled={isButtonDisabled} onClick={handleClick} sx={{ width: "10%" }}>CANCEL ORDER</Button>
        <AlertDialogSlide
          cancelOrder={cancelOrder}
          open={dialogOpen}
          setOpen={setDialogOpen}
        />
      </CardContent>
    </Card>

  );
}

export default MyOrderCard;