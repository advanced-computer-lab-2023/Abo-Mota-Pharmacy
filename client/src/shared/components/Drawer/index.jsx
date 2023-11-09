import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import DrawerItem from '../DrawerItem';


export default function TemporaryDrawer({ isOpen, closeDrawer, cartItems=[] , onDeleteItem}) {
  const toggleDrawer = (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
  };

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
              />
            ))}
            {/* if cart not empty */}
          <Button className="checkout-button" variant="contained" color="success" disabled={cartItems.length === 0}>GO TO CHECKOUT</Button>
        </Drawer>
      </React.Fragment>
    </div>
  );
}
