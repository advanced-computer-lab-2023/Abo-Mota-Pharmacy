import './styles.css';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';

const Accordion3 = ({ open,setOpen,totalAmount }) => {
  //const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCVV] = useState('');
  const [paymentStatus, setPaymentStatus] = useState(null);
  const walletAmount = 1000;
  //const totalAmount=500;

  const navigate = useNavigate(); 

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
        </>
      );
    }else if (selectedOption === 'wallet') {
      return (
        <>
          <div>
            <p>Wallet Amount: ${walletAmount}</p>
            <p>Total Amount: ${totalAmount}</p>
            {totalAmount <= walletAmount ? (
              <>
                {paymentStatus !== 'success' ? (
                  <button onClick={handlePayment}>Pay</button>
                ) : null}
              </>
            ) : (<p className="failure-message">Not enough amount in the wallet.</p>
            )}
          </div>
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
          <button className="viewOrderButton" onClick={handleViewOrder}>
            View my order!
          </button>
        </>
      );
    };
    return null;
  };

  const handleViewOrder = () => {
    // Navigate to the /Order page
    navigate('/order');
  };

  const renderCashOnDeliveryButton = () => {
    if (selectedOption === 'cashOnDelivery') {
      return (
        <button className='viewOrderButton' onClick={handleViewOrder}>
          View my order!
        </button>
      );
    }
    return null;
  };

  
  const className = `accordion ${open ? 'open' : 'closed'}`;

  return (
    <div className='accordion-container'>
      <h4 onClick={onClick}>
        <Icon icon="tabler:circle-dashed-number-2" /> PAYMENT OPTIONS
      </h4>
      {open && (
        <div className='accordion-extension'>
          
          {selectedOption === 'wallet' && (
            <>
              {renderPaymentInputs()}
              {renderPaymentStatus()}
              
            </>
          )}

          {/* Render radio buttons only if credit card option is not selected */}
          {selectedOption !== 'creditCard' && selectedOption !== 'wallet' && (
            <>
              <h3>Choose a payment method</h3>
              <label>
                <input
                  type="radio"
                  value="wallet"
                  checked={selectedOption === 'wallet'}
                  onChange={() => setSelectedOption('wallet')}
                />
                Pay with Wallet
              </label>

              <label>
                <input
                  type="radio"
                  value="creditCard"
                  checked={selectedOption === 'creditCard'}
                  onChange={() => setSelectedOption('creditCard')}
                />
                Pay with Credit Card
              </label>

              <label>
                <input
                  type="radio"
                  value="cashOnDelivery"
                  checked={selectedOption === 'cashOnDelivery'}
                  onChange={() => setSelectedOption('cashOnDelivery')}
                />
                Cash on Delivery
              </label>
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
