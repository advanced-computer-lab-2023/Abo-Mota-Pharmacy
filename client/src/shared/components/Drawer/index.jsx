import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import DrawerItem from '../DrawerItem';
import { useNavigate } from 'react-router-dom';

export default function TemporaryDrawer({ isOpen, closeDrawer, cartItems=[], onDeleteItem, onQuantityInc, onQuantityDec, totalAmount, medicines}) {
  const toggleDrawer = (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
  };

  totalAmount = cartItems.reduce((total, item) => {
    return total + item.quantity * item.medicine.price;
  }, 0);
  
  const navigate=useNavigate();
  console.log("medicines at drawer:", medicines);
  const handleRedirect=()=> navigate('../Checkout',{state: {totalAmount,cartItems, medicines} });
  

  return (
    <div className="drawer">
      <React.Fragment>
        <Button onClick={toggleDrawer} sx={{ display: 'none' }}>
          Toggle Drawer
        </Button>
        <Drawer anchor="right" open={isOpen} onClose={closeDrawer}>
          <Box
            sx={{ width: 300, padding: '16px' }}
            role="presentation"
            onClick={toggleDrawer}
            onKeyDown={toggleDrawer}
          >
          </Box>
          {cartItems.map((item, index) => (
              <DrawerItem
                key={index}
                name={item.medicine.name}
                description={item.medicine.description}
                price={item.medicine.price}
                quantity={item.quantity}
                onDelete={() => onDeleteItem(item)}
                quantityInc={() => onQuantityInc(item)}
                quantityDec={() => onQuantityDec(item)}
              />
            ))}
            <h2>Total: ${totalAmount}</h2>
          <Button  className="checkout-button" variant="contained" color="success" disabled={cartItems.length === 0} onClick={handleRedirect}>GO TO CHECKOUT</Button>
        </Drawer>
      </React.Fragment>
    </div>
  );
}
