import React, { useState ,Fragment,useRef} from 'react';
import { useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Button, Typography} from "@mui/joy";
import { useNavigate } from 'react-router-dom';
import { FaRegCreditCard } from "react-icons/fa";
import { IoWallet } from "react-icons/io5";
import {BsCashCoin} from "react-icons/bs";
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




const Checkout = ({}) => {
  const location = useLocation();
  const {totalAmount,cartItems}=location.state
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = ["Personal Info", "Delivery", "Payment"];
  const savedAddresses = ['Address 1', 'Address 2', 'Address 3'];
  const [paymentStatus, setPaymentStatus] = useState(null);
  const walletAmount = 100;
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate(); 
  const handleRedirect=()=> navigate('/patient/order',{state: { totalAmount, cartItems }});
  const prevActiveStep = activeStep;
  const [openCity, setOpenCity] = React.useState(false);
  const [openSavedAddresses, setOpenSavedAddresses] = React.useState(false);
  const [showMap, setShowMap] = useState(false);
  const [selectedCity,setSelectedCity]=useState("");
  const itemsAndQuantities = cartItems.map(item => [item.name, item.quantity]);
  const cities = ['Cairo', 'Giza', 'Alex'];
  const [selectedAddress, setSelectedAddress] = useState(null); // Initialize selectedAddress state


const handleAddressSelection = (address) => {
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
    if (prevActiveStep === 2) {
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
      case 'creditCard':
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
    if (selectedOption === 'creditCard') {
      return (
        <>
          <div className="input-group">
            <label>Card Number*:</label>
            <input className="input-field" type="text"  />
          </div>
          <div className="input-group">
            <label>Expiry Date*:</label>
            <input  className="input-field" type="date" 
             />
          </div>
          <div className="input-group">
            <label>CVV*:</label>
            <input className="input-field" type="text" />
          </div>
          {paymentStatus !== 'success' && (
            <button className="smallButton" onClick={handlePayment}>
              Pay
            </button>
          )}
          <Typography level="body-sm">By clicking Pay you agree to the Terms & Conditions.</Typography>
        </>
      );
    }else if (selectedOption === 'wallet') {
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
                    ):null}
                  </>
                  ):(<Stack sx={{ width: '25%' }} spacing={2}>
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
        
        <div style={{display:"flex" , flexDirection:"column",position:"fixed",bottom:"0",right:"0"}}>
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
    if (selectedOption === 'cashOnDelivery') {
      return (
        <button className='viewOrderButton'  onClick={handleRedirect}>
          View my order!
        </button>
      );
    }
    return null;
  };

  const buttonGroup = [
    {
      id: 1,
      label: "Card",
      icon: <FaRegCreditCard />,
      onClick: () => setSelectedOption('creditCard'),
    },
    {
      id: 2,
      label: "Wallet",
      icon: <IoWallet />,
      onClick: () => setSelectedOption('wallet'),
    },
    {
      id:3,
      label: "Cash",
      icon: <BsCashCoin/>,
      onClick:()=> setSelectedOption('cashOnDelivery')
    }
  ];

  
 
const getStepContent = (stepIndex) => {
  switch (stepIndex) {
    case 0:
      return (
        <div >
         
          <div >
             <Typography level="h6" sx={{ ml: 0.5 }}> <MdDriveFileRenameOutline/>First Name*:</Typography>
            <Input placeholder="" sx={{ width: '100%', fontSize: '1.5rem', '&::before': { display: 'none' }, '&:focus-within': { outline: '2px solid var(--Input-focusedHighlight)', outlineOffset: '2px' } }} />
       
            <Typography level="h6" sx={{ ml: 0.5 }}> <MdDriveFileRenameOutline/>Last Name*:</Typography>
            <Input placeholder="" sx={{ width: '100%', fontSize: '1.5rem', '&::before': { display: 'none' }, '&:focus-within': { outline: '2px solid var(--Input-focusedHighlight)', outlineOffset: '2px' } }} />
          </div>
          
          <div >
             <Typography level="h6" sx={{ ml: 0.5 }}> <AiTwotoneMail/>Email address for notifications:</Typography>
            <Input placeholder="" sx={{ width: '100%', fontSize: '1.5rem', '&::before': { display: 'none' }, '&:focus-within': { outline: '2px solid var(--Input-focusedHighlight)', outlineOffset: '2px' } }} />
        
             <Typography level="h6" sx={{ ml: 0.5 }}> <BiSolidMobileVibration/>Phone Number*:</Typography>
            <Input placeholder="" sx={{ width: '100%', fontSize: '1.5rem', '&::before': { display: 'none' }, '&:focus-within': { outline: '2px solid var(--Input-focusedHighlight)', outlineOffset: '2px' } }} />
          </div>
        </div>
      );
     
    case 1:
      return (
        <div>
          <div className="column">
          <Typography level="h6" sx={{ ml: 0.5 }}> Apartment Number*:</Typography>
            <Input placeholder="" sx={{ width: '100%', fontSize: '1.5rem', '&::before': 
            { display: 'none' }, '&:focus-within': { outline: '2px solid var(--Input-focusedHighlight)', outlineOffset: '2px' } }} />
          </div>

          <div className="column">
          <Typography level="h6" sx={{ ml: 0.5 }}> Street Name*:</Typography>
            <Input placeholder="" sx={{ width: '100%', fontSize: '1.5rem', '&::before': 
            { display: 'none' }, '&:focus-within': { outline: '2px solid var(--Input-focusedHighlight)', outlineOffset: '2px' } }} />
          </div>

          <div className="column">
          <Typography level="h6" sx={{ ml: 0.5 }}> Address*:</Typography>
          <Stack spacing={1.5}>
                <Input placeholder="Your address"
                        startDecorator={
                          <Button variant="soft" color="neutral" startDecorator={<LocationOn />} onClick={handleLocateClick}>
                            Locate
                          </Button>
                        }
                        sx={{ width: '100%' }}
            />
          </Stack>
          {showMap && (
            // Render the map when showMap state is true
            // You'll need to implement the map integration here
            <div>
              {/* Your map component or integration */}
            </div>
          )}
          </div>

          <div className="column">
          <Typography level="h6" sx={{ mr: 0.5 }} > Saved Addresses*:
          <Dropdown open={openSavedAddresses} onOpenChange={handleOpenChangeSavedAddresses}>
          <MenuButton style={{marginLeft:"10px"}}>
            {selectedAddress ? selectedAddress : 'Saved Addresses'} <BsArrowDownSquare style={{ marginLeft: '10px' }}/>
          </MenuButton>
          <Menu>
            {savedAddresses.map((address, index) => (
              <MenuItem style={{width:'100%'}} key={index} onClick={() => handleAddressSelection(address)}>
                {address}
              </MenuItem>
            ))}
          </Menu>
        </Dropdown>
          
          
          </Typography>
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div>
            <Typography level="h6" sx={{ ml: 0.5 }} style={{ marginRight: '10px' }}> City*:
            <Dropdown open={openCity} onOpenChange={handleOpenChangeCity} >
              <MenuButton style={{ marginLeft: '10px' }}>
                {selectedCity ? selectedCity : 'City'} <BsArrowDownSquare style={{ marginLeft: '10px' }}/>
              </MenuButton>
              <Menu>
                {cities.map((city, index) => (
                  <MenuItem key={index} onClick={() => setSelectedCity(city)}>
                    {city}
                  </MenuItem>
                ))}
              </Menu>
            </Dropdown>
            
            </Typography>
            
            
            </div>
          <div style={{ marginLeft: '30px' }}>
          <Typography  style={{width:'100%'}} level="h8" sx={{ ml: 0 }}> Set As Default
          <input type="checkbox" id="isDefault" />
          
          </Typography>
          
              </div>
          </div>

          

          
        </div>
      );
    case 2:
      return (
        <div>
          {selectedOption === 'wallet' && (
            <>
              {renderPaymentInputs()}
              
              <Typography level="body-sm">By clicking Pay you agree to the Terms & Conditions.</Typography>
              
            </>
          )}

          {/* Render radio buttons only if credit card option is not selected */}
          {selectedOption !== 'creditCard' && selectedOption !== 'wallet' && (
            <>
              <Typography level="h4" sx={{ ml: 0.5 }}> Choose a payment method</Typography>
              
              <Box id="button-group" className="flex space-x-2 mb-5">
                {buttonGroup.map((button) => (
                  <Button
                    key={button.id}
                    variant="outlined"
                    onClick={button.onClick}
                    startDecorator={button.icon}
                    sx={
                      button.label.toLowerCase() === selectedOption
                        ? { borderColor: "#0b6bcb", borderWidth: 2 }
                        : {}
                    }
                    className="h-16 w-24"
                  >
                    {button.label}
                  </Button>
                ))}
              </Box>
              
            </>
          )}
          {selectedOption !== 'wallet' && (
            <>
              {renderPaymentInputs()}
              
              
            </>
          )}
          {renderCashOnDeliveryButton()}
          
        </div>
        
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
         
      <div style={{ display:"flex",justifyContent:"center", alignItems: 'center', height: '40vh',gap:"10px" }}>
       
          {getStepContent(activeStep)}
        
      </div>
          
      {activeStep === steps.length ? (
        <Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>All steps completed - you&apos;re finished</Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </Fragment>
      ) : (
        <Fragment>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <div >
            <Button  disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }} >
              Back
            </Button>
            </div>
            <Box sx={{ flex: "1 1 auto" }} />

            
          {activeStep === steps.length - 1 ? renderPaymentStatus() : 
              <Button onClick={handleNext}>
                   Next
              </Button>}
          </Box>
        </Fragment>
      )}
    </Box>
    
  //const queryParams = new URLSearchParams(location.search);
  //const totalAmount = queryParams.get('total');

  //array of each purchased item and the quantity purchsed to be deducted from "availableQuantity" AND added to "sold" in db
  

    

  
)};

export default Checkout;





