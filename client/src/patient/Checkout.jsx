import React, { useState, Fragment, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Button, Typography, Card,Divider } from "@mui/joy";
import { useNavigate } from 'react-router-dom';
import { FaRegCreditCard } from "react-icons/fa";
import { IoWallet } from "react-icons/io5";
import { BsCashCoin } from "react-icons/bs";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Input from '@mui/joy/Input';
import Dropdown from '@mui/joy/Dropdown';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import LocationOn from '@mui/icons-material/LocationOn';
import { BiSolidMobileVibration } from 'react-icons/bi';
import { AiTwotoneMail } from 'react-icons/ai';
import { BsArrowDownSquare } from 'react-icons/bs';
import { MdDriveFileRenameOutline } from 'react-icons/md';
import CardPayment from "./stripe/CardPayment"
import WalletPayment from './stripe/WalletPayment';
import { useCreateOrderMutation } from '../store';
import Toast from "./Toast";
import { LuStethoscope, LuCalendarClock, LuBuilding } from "react-icons/lu";
import { useAddToCartMutation, useGetPatientQuery } from '../store';


const Checkout = ({ }) => {

  const navigate = useNavigate();
  const location = useLocation();
  const { totalAmount, cartItems, medicines } = location.state
  const handleRedirect = () => navigate('/patient/order', { state: { totalAmount, cartItems } });

  const [activeStep, setActiveStep] = React.useState(0);
  const steps = ["Delivery",  "Payment"];
  const savedAddresses = ['800,Nasr,Ciiro', 'Address 2', 'Address 3'];
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  const prevActiveStep = activeStep;
  const [openCity, setOpenCity] = React.useState(false);
  const [openSavedAddresses, setOpenSavedAddresses] = React.useState(false);
  const [showMap, setShowMap] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");
  // const itemsAndQuantities = cartItems.map(item => [item.name, item.quantity]);
  
  const [selectedAddress, setSelectedAddress] = useState(null); // Initialize selectedAddress state
  const [apartmentNumber, setApartmentNumber] = useState('');
  const [streetName, setStreetName] = useState('');
  const [city, setCity] = useState('');


  // PAYMENT INTEGRATION
  const [toast, setToast] = useState({
    open: false,
    duration: 4000
  });

  const [createOrder] = useCreateOrderMutation();
  
  const onSuccessfulCheckout = () => {
    createOrder({
      medicines: cartItems
    });

    setToast({
      ...toast,
      open: true,
      color: "success",
      message: "Payment completed successfully!",
    });

    setTimeout(() => {
      navigate("/patient/order" , { state: { totalAmount, cartItems } });
    }, 1500);
  }

  const onFailedCheckout = () => {
    setToast({
      ...toast,
      open: true,
      color: "danger",
      message: "Payment unsuccessful",
    });
  }

 
  

  const onToastClose = (event, reason) => {
    if (reason === "clickaway") return;

    setToast({
      ...toast,
      open: false,
    });
  };

  
  //itemsAndQuantities is an array of each purchased item and the quantity purchsed to be deducted from "availableQuantity" 
  //AND added to "sold" in db


  const handleAddressSelection = (address) => {
   // Split the address into components
  const addressComponents = address.split(','); // Assuming the address follows a format like "Apt 123, Elm Street, New York"

  // Extract components
  const [apartment, street, selectedCity] = addressComponents;

  // Update state for each component
  setApartmentNumber(apartment);
  setStreetName(street);
  setCity(selectedCity);
    setSelectedAddress(address);

  };

  const handleLocateClick = () => {
    setShowMap(true);

  };

  const handleCitySelection = (city) => {
    setSelectedCity(city); // Set the selected city in state
  };

  const handleOpenChangeCity = React.useCallback((event, isOpen) => {
    setOpenCity(isOpen);
  }, []);

  const handleOpenChangeSavedAddresses = React.useCallback((event, isOpen) => {
    setOpenSavedAddresses(isOpen);
  },);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {

    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    if (prevActiveStep === 0) {
      setSelectedOption(null);
    }
  };

  const handleReset = () => {

    setActiveStep(0);
  };


  const handlePayment = () => {
    switch (selectedOption) {
      case 'wallet':
        if (totalAmount <= walletAmount) {
          // Implement wallet payment logic
          console.log('Paying with wallet');

          setPaymentStatus('success');
        } else {
          console.log('Not enough amount');


        }
        break;
      case 'card':
        // You can handle credit card payment logic here if needed
        setPaymentStatus('success');
        break;
      case 'cashOnDelivery':
        // Implement cash on delivery logic
        console.log('Cash on delivery selected');

        setPaymentStatus('success');
        break;
      default:
        return null;
    }
  };

  const renderPaymentInputs = () => {
    if (selectedOption === 'credit') {
      return (
        <>
          {/* <CardPayment
            deductible={500}
            onSuccess={() => { 
              createOrder({
                medicines: []
              })
            }}
            onFailure={() => { }}
          /> */}
        </>
      );
    } else if (selectedOption === 'wallet') {
      return (
        <>
          <form >
            <Typography level="h3" fontWeight={500}>Available Balance - ${walletAmount}</Typography>
            <Typography level="h3" fontWeight={500}>Total Amount - ${totalAmount}</Typography>
            {totalAmount <= walletAmount ? (
              <>
                {paymentStatus !== 'success' ? (
                  <Button
                    //type="submit"
                    variant="solid"

                    id="submit"
                    sx={{ width: "25%", my: 3, borderRadius: 1 }}
                    onClick={handlePayment}
                  >
                    <span id="Button-text">{"Pay"}</span>
                  </Button>
                ) : null}
              </>
            ) : (<Stack sx={{ width: '25%' }} spacing={2}>
              <Alert severity="error">Not enough amount in the wallet!</Alert>

            </Stack>)}


          </form>
        </>
      );
    }
    return null;
  };
  const renderPaymentStatus = () => {
    if (paymentStatus === 'success') {
      return (
        <>

          <div style={{ display: "flex", flexDirection: "column", position: "fixed", bottom: "0", right: "0" }}>
            <div>
              <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert severity="success">Payment Successful</Alert>

              </Stack>
            </div>
            <div>
              <button className="viewOrderButton" onClick={handleRedirect}>
                View my order!
              </button>
            </div>
          </div>

        </>
      );
    };
    return null;
  };

  const renderCashOnDeliveryButton = () => {
    if (selectedOption === 'cash') {
      return (
        <>
        <Typography level="h3" fontWeight={500}>Total Amount - ${totalAmount}</Typography>
        <button className='viewOrderButton' onClick={onSuccessfulCheckout}>
          Place Order
        </button>
        </>
      );
    }
    return null;
  };

  const buttonGroup = [
    {
      id: 1,
      label: "Card",
      icon: <FaRegCreditCard />,
      onClick: () => setSelectedOption('card'),
    },
    {
      id: 2,
      label: "Wallet",
      icon: <IoWallet />,
      onClick: () => setSelectedOption('wallet'),
    },
    {
      id: 3,
      label: "Cash",
      icon: <BsCashCoin />,
      onClick: () => setSelectedOption('cash')
    }
  ];



  const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
          <div>
            <div className="column">
              <Typography level="h6" sx={{ ml: 0.5 }}> Apartment Number*:</Typography>
              <Input placeholder="Apartment Number" value={apartmentNumber} onChange={(e) => setApartmentNumber(e.target.value)} sx={{
                width: '100%', fontSize: '1.5rem', '&::before':
                  { display: 'none' }, '&:focus-within': { outline: '2px solid var(--Input-focusedHighlight)', outlineOffset: '2px' }
              }} />
            </div>

            <div className="column">
              <Typography level="h6" sx={{ ml: 0.5 }}> Street Name*:</Typography>
              <Input placeholder="Street Name" value={streetName} onChange={(e) => setStreetName(e.target.value)} sx={{
                width: '100%', fontSize: '1.5rem', '&::before':
                  { display: 'none' }, '&:focus-within': { outline: '2px solid var(--Input-focusedHighlight)', outlineOffset: '2px' }
              }} />
            </div>

            <div className="column">
              <Typography level="h6" sx={{ ml: 0.5 }}> City*:</Typography>
              <Input placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} sx={{
                width: '100%', fontSize: '1.5rem', '&::before':
                  { display: 'none' }, '&:focus-within': { outline: '2px solid var(--Input-focusedHighlight)', outlineOffset: '2px' }
              }} />
            </div>

           

            <div className="column">
              <Typography level="h6" sx={{ mr: 0.5 }} > Saved Addresses*:
                <Dropdown open={openSavedAddresses} onOpenChange={handleOpenChangeSavedAddresses}>
                  <MenuButton style={{ marginLeft: "10px" }}>
                    {selectedAddress ? selectedAddress : 'Saved Addresses'} <BsArrowDownSquare style={{ marginLeft: '10px' }} />
                  </MenuButton>
                  <Menu>
                    {savedAddresses.map((address, index) => (
                      <MenuItem style={{ width: '100%' }} key={index} onClick={() => handleAddressSelection(address)}>
                        {address}
                      </MenuItem>
                    ))}
                  </Menu>
                </Dropdown>


              </Typography>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginTop: 10 }} className='flex justify-end'>
              
              <div style={{ marginLeft: '30px' }} >
                <Typography style={{ width: '100%' }} level="h8" sx={{ ml: 0 }}> 
                  
                <Button onClick={handleAddAddress}>Add Address</Button>
                </Typography>

              </div>
            </div>




          </div>
        );

      
        

      case 1:
        return (
          <Card sx={{ borderRadius: 0, p: 4 }}>
            <Box id="button-group" sx={{ display: "flex", gap: 1 }} className="flex space-x-2 mb-5">
              {buttonGroup.map((button) => (
                <Button
                  key={button.id}
                  variant="outlined"
                  onClick={button.onClick}
                  startDecorator={button.icon}
                  sx={
                    {
                      ...{ width: 70, height: 50 },
                      ...(button.label.toLowerCase() === selectedOption
                        ? { borderColor: "#0b6bcb", borderWidth: 2 }
                        : {})
                    }
                  }
                  className="h-16 w-24"
                >
                  {button.label}
                </Button>
              ))}
            </Box>

            {/* MAIN PAYMENT COMPONENT */}

            {selectedOption === "card" && (
              <CardPayment
                deductible={totalAmount}
                totalAmount={totalAmount}
                onSuccess={onSuccessfulCheckout}
                onFailure={onFailedCheckout}
              />
            )}
              {selectedOption === "wallet" &&
                (
                  <WalletPayment
                    deductible={totalAmount}
                    onSuccess={onSuccessfulCheckout}
                    totalAmount={totalAmount}
                    onFailure={onFailedCheckout}
                  />
                  
                ) }
                {selectedOption === "cash" &&(
                  renderCashOnDeliveryButton()
                )} 
          </Card>
        );
      default:
        return '';
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Typography level="h1" sx={{ ml: 0.5 }}>
        Checkout

      </Typography>
      <Typography level="h4" sx={{ ml: 0.5 }}>
        Required field *

      </Typography>

      <div style={{ display: "flex", justifyContent: "center", alignItems: 'center', height: '40vh', gap: "10px" }}>

        {getStepContent(activeStep)}

      </div>

      
        <Fragment>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <div >
              <Button disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }} >
                Back
              </Button>
            </div>
            <Box sx={{ flex: "1 1 auto" }} />


            {activeStep === steps.length -1 ? renderPaymentStatus() :
              <Button onClick={handleNext}>
                Next
              </Button>}
          </Box>
        </Fragment>
      


      <Toast {...toast} onClose={onToastClose} />

    </Box>

  )
};

export default Checkout;





