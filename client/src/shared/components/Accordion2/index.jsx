import './styles.css'
import { useState } from 'react';
import { Icon } from '@iconify/react';


const Accordion2 = ({savedAddresses,open,onContinue,setOpen}) => {
 const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [city, setCity] = useState('');
  const [isDefault, setIsDefault] = useState(false);
  const [savedAddress,setSavedAddress]=useState('');
  

  

  const onClick = () => {
    setOpen(!open);
    if (!open) {
      setFirstName('');
      setLastName('');
      setStreetAddress('');
      setEmail('');
      setPhoneNumber('');
      setCity('');
      setIsDefault(false);
      setSavedAddress('');
    }
  };
  

const handleContinue=()=>{
 // Add logic to save address in DATABASE
 
 onContinue(); // Notify parent component (Checkout) to handle the Continue action
 setOpen(false); // Close the current accordion
};

  const className = `accordion ${open ? 'open' : 'closed'}`;
  return (
    <div className='accordion-container' >
      <h4 onClick={onClick}>
      <Icon icon="tabler:circle-dashed-number-1" /> DELIVERY </h4>
      {open ? <div className='accordion-extension'>
        Required field *
        <div className="two-column-grid">
          <div className="column">
            <label htmlFor="firstName">First Name*:</label>
            <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
          </div>
          <div className="column">
            <label htmlFor="lastName">Detailed Address*:</label>
            <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </div>
          <div className="column">
            <label htmlFor="streetAddress">Last Name*:</label>
            <input type="text" id="streetAddress" value={streetAddress} onChange={(e) => setStreetAddress(e.target.value)} />
          </div>
          <div className="column">
            <label htmlFor="city">Email address for order notifications</label>
            <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="column">
            <label htmlFor="city">Phone Number*:</label>
            <input type="text" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          </div>
          <div className="column">
            <label htmlFor="country">City*:</label>
            <select id="country" value={city} onChange={(e) => setCity(e.target.value)}>
              <option >Cairo</option>
              <option >Giza</option>
              <option>Alexandria</option>
            </select>
          </div>

          
        </div>
        <div className="column">
            <label >Saved Addresses*:</label>
            <select id="Address" value={savedAddress} onChange={(e) => setSavedAddress(e.target.value)}>
            {savedAddresses.map((address, index) => (
                <option key={index} value={address}>
                  {address}
                </option>
              ))}
            </select>
          </div>
        <div className="flex mb-4">
          <label htmlFor="isDefault">Set as Default:</label>
          <input type="checkbox" id="isDefault" checked={isDefault} onChange={(e) => setIsDefault(e.target.checked)}/>
        </div>
        <button className="continue" type="submit" onClick={handleContinue}>Continue</button>
       
        </div> : <></>}
      
    </div>
  );
}

export default Accordion2; 