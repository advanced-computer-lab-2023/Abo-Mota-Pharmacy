import React, { useState } from 'react';
import Accordion2 from '../shared/components/Accordion2';
import Accordion3 from '../shared/components/Accordion3';
import { useLocation } from 'react-router-dom';

const Checkout = ({cartItems}) => {
  const savedAddresses = ['Address 1', 'Address 2', 'Address 3'];
  
  const [accordion2Open, setAccordion2Open] = useState(false);
  const [accordion3Open, setAccordion3Open] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const totalAmount = queryParams.get('total');
  
  const handleAccordion2Continue = () => {
    // Logic to handle Continue button click in Accordion2
    // ...

    // Close Accordion2 and open Accordion3
    setAccordion2Open(false);
    setAccordion3Open(true);
  };


  return (
    <div>
       
        <h1 style={{ textAlign: 'center' }}>Checkout</h1>
        <Accordion2 savedAddresses={savedAddresses} open={accordion2Open} setOpen={setAccordion2Open} onContinue={handleAccordion2Continue}/>  
        
        <Accordion3 open={accordion3Open} setOpen={setAccordion3Open} totalAmount={totalAmount} cartItems={cartItems}/>

         
        

      
    </div>
  );
};

export default Checkout;





