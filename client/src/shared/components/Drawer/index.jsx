import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import DrawerItem from '../DrawerItem';
import { useNavigate } from 'react-router-dom';
import { useGetMedicineByIdQuery } from '../../../store';

export default function TemporaryDrawer({
  isOpen,
  closeDrawer,
  cartItems = [],
  onDeleteItem,
  onQuantityInc,
  onQuantityDec,
  totalAmount,
  medicines,
}) {
  const toggleDrawer = (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
  };

  totalAmount = cartItems.reduce((total, medicine) => {
    return total + medicine.quantity * medicine.price;
  }, 0);

  const navigate = useNavigate();
  console.log("medicines at drawer:", medicines);
  const handleRedirect = () =>
    navigate("../Checkout", { state: { totalAmount, cartItems, medicines } });

  return (
    <div className="drawer">
      <Drawer
        anchor="right"
        open={isOpen}
        onClose={closeDrawer}
        className="flex flex-col"
      >
        <div className="pl-2 pr-2 flex flex-col">
          {cartItems.map((medicine, index) => (
            <DrawerItem
              key={index}
              name={medicine.name}
              description={medicine.description}
              price={medicine.price}
              quantity={medicine.quantity}
              onDelete={() => onDeleteItem(medicine)}
              quantityInc={() => onQuantityInc(medicine)}
              quantityDec={() => onQuantityDec(medicine)}
              medicineImage={medicine.medicineImage}
            />
          ))}
        </div>
        <div className="flex flex-col justify-end p-2">
          <h2 className="text-2xl font-semibold">
            Total: ${totalAmount}
          </h2>
          <Button
            className="checkout-button mt-2"
            variant="contained"
            color="success"
            disabled={cartItems.length === 0}
            onClick={handleRedirect}
          >
            GO TO CHECKOUT
          </Button>
        </div>
      </Drawer>
    </div>
  );
}
