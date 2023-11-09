import React, { useState } from 'react';
import './checkout.css'
import Accordion2 from '../shared/components/Accordion2';
import Accordion3 from '../shared/components/Accordion3';
const Checkout = () => {
  const savedAddresses = ['Address 1', 'Address 2', 'Address 3'];
  const [showAccordion3, setShowAccordion3] = useState(false);

  const handleSaveAddress = () => {
    setShowAccordion3(true); // Open the second accordion when saving address in the first accordion
  };
  //{showAccordion3 &&}

  return (
    <div>
       
        <h1 style={{ textAlign: 'center' }}>Checkout</h1>
        <Accordion2 savedAddresses={savedAddresses} onSaveAddress={handleSaveAddress}/>  
        
         <Accordion3 />
        

      
    </div>
  );
};

export default Checkout;





