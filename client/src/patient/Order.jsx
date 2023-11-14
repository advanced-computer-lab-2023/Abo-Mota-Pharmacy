import React, { useState ,useEffect} from 'react';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Divider from '@mui/joy/Divider';
import Box from '@mui/joy/Box';
import { useLocation } from 'react-router-dom';
import OrderItems from '../shared/components/OrderItems';
import Button from '@mui/material/Button';
import AlertDialogSlide from '../shared/components/Alert';



function OrderCard() {
  const location = useLocation();
  const {totalAmount,cartItems}=location.state
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });
  
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [status, setStatus] = useState("PENDING");
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const cancelOrder = () => {
    setStatus("CANCELLED");
    setIsButtonDisabled(true);
  };

  const handleButtonClick = () => {
    setDialogOpen(true);
  };

  return (
    <Card
      variant="outlined"
      orientation="horizontal"
      sx={{
        width: "90%%",
        '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
        //...sx
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
              YOUR ORDER IS {status}
            </Typography>

            {/* <Chip color={colors[status]} variant='soft'> */}
              <Typography level='title-lg'>
                {/* {capitalize(status)} */}
              </Typography>
            {/* </Chip> */}
          </Box>

          
        </Box>

        <Divider sx={{ marginBottom: 1.5 }} />

        <Box className="flex items-center justify-between">
          <Box className='flex  space-x-4'>
            

            <Box className='mr-10'>
              <Typography level="title-lg" id="card-description">
              {cartItems.map((item, index) => (
              <OrderItems
                key={index}
                name={item.name}
                description={item.description}
                price={item.price}
                quantity={item.quantity}
                medicineImage={item.medicineImage}
              />
            ))}
              </Typography>
              <Typography level="h5" fontWeight={500}>Total Amount : ${totalAmount}</Typography>
              <Typography level="h5" aria-describedby="card-description" mb={1}>
                Estimated delivery: <strong>{currentDate}</strong><br />
                <strong>YOUR ORDER IS ON ITS WAY</strong>
              </Typography>
              <Button variant="outlined" color="error" onClick={handleButtonClick} disabled={isButtonDisabled}>CANCEL ORDER</Button>
              <AlertDialogSlide
                cancelOrder={cancelOrder}
                open={dialogOpen}
                setOpen={setDialogOpen}
              />
            </Box>
          </Box>

        </Box>

      </CardContent>
    </Card>

  );
}

export default OrderCard;