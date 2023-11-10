import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import DrawerItem from '../DrawerItem';


export default function TemporaryDrawer({ isOpen, closeDrawer, cartItems=[], onDeleteItem, onQuantityInc, onQuantityDec, totalAmount}) {
  const toggleDrawer = (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
  };

  totalAmount = cartItems.reduce((total, item) => {
    return total + item.quantity * item.price;
  }, 0);

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
                name={item.name}
                description={item.description}
                price={item.price}
                quantity={item.quantity}
                onDelete={() => onDeleteItem(item)}
                quantityInc={() => onQuantityInc(item,item.quantity)}
                quantityDec={() => onQuantityDec(item,item.quantity)}
              />
            ))}
            <h2>Total: ${totalAmount}</h2>
          <Button  className="checkout-button" variant="contained" color="success" disabled={cartItems.length === 0} onClick={() => window.location.href = `http://localhost:3000/patient/Checkout?total=${totalAmount}`}>GO TO CHECKOUT</Button>
        </Drawer>
      </React.Fragment>
    </div>
  );
}
