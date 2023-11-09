import './styles.css';
import { useState } from 'react';
import { Icon } from '@iconify/react';

const Accordion3 = () => {
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCVV] = useState('');

  const onClick = () => {
    setOpen(!open);
  };

  const handlePayment = () => {
    switch (selectedOption) {
      case 'wallet':
        // Implement wallet payment logic
        console.log('Paying with wallet');
        break;
      case 'creditCard':
        // You can handle credit card payment logic here if needed
        break;
      case 'cashOnDelivery':
        // Implement cash on delivery logic
        console.log('Cash on delivery selected');
        // You might display a confirmation message or take further actions
        break;
      default:
        return null;
    }
  };

  const renderPaymentInputs = () => {
    if (selectedOption === 'creditCard') {
      return (
        <>
          <div>
            <label>Card Number:</label>
            <input type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
          </div>
          <div>
            <label>Expiry Date:</label>
            <input type="text" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
          </div>
          <div>
            <label>CVV:</label>
            <input type="text" value={cvv} onChange={(e) => setCVV(e.target.value)} />
          </div>
        </>
      );
    }
    return null;
  };

  const className = `accordion ${open ? 'open' : 'closed'}`;

  return (
    <div className='accordion-container'>
      <h4 onClick={onClick}>
        <Icon icon="tabler:circle-dashed-number-2" /> PAYMENT
      </h4>
      {open ? (
        <div className='accordion-extension'>
          

          {/* Render radio buttons only if credit card option is not selected */}
          {selectedOption !== 'creditCard' && (
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

          {renderPaymentInputs()}

          <button onClick={handlePayment}>Proceed to Payment</button>
        </div>
      ) : <></>}
    </div>
  );
};

export default Accordion3;
