import * as React from 'react';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Avatar from '@mui/joy/Avatar';
import IconButton from '@mui/joy/IconButton';
import Divider from '@mui/joy/Divider';
import Box from '@mui/joy/Box';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { BiChat } from "react-icons/bi";
import Chip from '@mui/joy/Chip';
import { useLocation } from 'react-router-dom';
import OrderItems from '../shared/components/OrderItems';

function OrderCard({}) {

  const location = useLocation();
  const {totalAmount,cartItems}=location.state
  //const queryParams = new URLSearchParams(location.search);
  //const totalAmount = queryParams.get('total');
  const status= "PENDING";
  const colors = {
    "upcoming": "warning",
    "cancelled": "error",
    "completed": "success"
  }
  //console.log("TOTAL AMOUNT",totalAmount);
  
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
              ORDER IS {status}
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
                
              />
            ))}
              </Typography>
              <Typography level="h5" fontWeight={500}>Total Amount : ${totalAmount}</Typography>
              <Typography level="h5" aria-describedby="card-description" mb={1}>
                Estimated delivery: <strong>MAY 28th</strong><br />
                <strong>YOUR ORDER IS ON ITS WAY</strong>
              </Typography>
            </Box>
          </Box>

        </Box>

      </CardContent>
    </Card>

  );
}

export default OrderCard;