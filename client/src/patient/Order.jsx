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


function OrderCard({cartItems}) {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const totalAmount = queryParams.get('total');
  
  const colors = {
    "upcoming": "warning",
    "cancelled": "error",
    "completed": "success"
  }
  console.log("total in order is: ", totalAmount);
  return (
    <Card
      variant="outlined"
      orientation="horizontal"
      sx={{
        width: "100%",
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
              ORDER NO.
            </Typography>

            {/* <Chip color={colors[status]} variant='soft'> */}
              <Typography level='title-lg'>
                {/* {capitalize(status)} */}
              </Typography>
            {/* </Chip> */}
          </Box>

          <Typography
            level="body-lg"
            aria-describedby="card-description"
            mb={1}
            startDecorator={<AccessTimeIcon fontSize='10' />}
          >
            
          </Typography>
        </Box>

        <Divider sx={{ marginBottom: 1.5 }} />

        <Box className="flex justify-between">
          <Box className='flex space-x-4'>
            <Avatar
              // alt={name}
            
              size="lg"
            />

            <Box className='mr-10'>
              <Typography level="title-lg" id="card-description">
                Dr. name
              </Typography>
              <Typography level="body-lg" aria-describedby="card-description" mb={1}>
                
              </Typography>
            </Box>
          </Box>

          <IconButton aria-label="call" size="md">
            <BiChat fontSize={24} />
          </IconButton>
        </Box>

      </CardContent>
    </Card>

  );
}

export default OrderCard;