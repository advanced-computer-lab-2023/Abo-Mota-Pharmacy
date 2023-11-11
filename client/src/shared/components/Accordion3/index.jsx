import './styles.css';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { Box } from "@mui/joy";
import { Typography, Divider, Button, Card } from "@mui/joy";
import { FaRegCreditCard } from "react-icons/fa";
import { IoWallet } from "react-icons/io5";
import {BsCashCoin} from "react-icons/bs";

const Accordion3 = ({ open,setOpen,totalAmount ,cartItems}) => {
  //const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCVV] = useState('');
  const [paymentStatus, setPaymentStatus] = useState(null);
  const walletAmount = 1000;
  //const totalAmount=500;

  const navigate = useNavigate(); 
  const handleRedirect=()=> navigate('/patient/order',{state: { totalAmount, cartItems }});

  const onClick = () => {
    setOpen(!open);
    // Reset payment status when accordion is opened
    setPaymentStatus(null);
    if (!open) {
      setSelectedOption(null);
      setCardNumber('');
      setExpiryDate('');
      setCVV('');
    }
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
            <label>Card Number:</label>
            <input className="input-field" type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
          </div>
          <div className="input-group">
            <label>Expiry Date:</label>
            <input  className="input-field" type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)}
             />
          </div>
          <div className="input-group">
            <label>CVV:</label>
            <input className="input-field" type="text" value={cvv} onChange={(e) => setCVV(e.target.value)} />
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
                  ):(<p className="failure-message">Not enough amount in the wallet.</p>)}

                  
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
          <p className="success-message">Payment Successful!</p>
          <button className="viewOrderButton" onClick={handleRedirect}>
            View my order!
          </button>
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
      onClick:()=> setSelectedOption('cashOnDelivery'),
    }
  ];

  
  const className = `accordion ${open ? 'open' : 'closed'}`;

  return (
    <div className='accordion-container'>
      <h4 onClick={onClick} >
        <Icon icon="tabler:circle-dashed-number-2" /> PAYMENT OPTIONS
      </h4>
      {open && (
        <div className='accordion-extension'>
          
          {selectedOption === 'wallet' && (
            <>
              {renderPaymentInputs()}
              {renderPaymentStatus()}
              <Typography level="body-sm">By clicking Pay you agree to the Terms & Conditions.</Typography>
              
            </>
          )}

          {/* Render radio buttons only if credit card option is not selected */}
          {selectedOption !== 'creditCard' && selectedOption !== 'wallet' && (
            <>
              <h3>Choose a payment method</h3>
              
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
              {renderPaymentStatus()}
              
            </>
          )}

          
          {renderCashOnDeliveryButton()}
          
        </div>
      )}
    </div>
  );
};

export default Accordion3;
