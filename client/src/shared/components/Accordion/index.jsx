import './styles.css'
import { useState } from 'react';
import AspirinLogo from '../../assets/aspirin.jpg'; 
import Button from '../Button'
import {AiOutlineEdit} from 'react-icons/ai'
import EditMedicine from '../../../pharmacist/scenes/EditMedicine';
const Accordion = ({label, subLabel, price, expanded, medicineDetails, isPharmacist = false}) => {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);

  const onClick = () => {
    setOpen(!open);
  };
  console.log(expanded);
  const extension = Object.entries(expanded).map(([key, value], index) => {
    if(!isPharmacist && (key === 'sales' || key == 'availableQuantity')) return null;
    return <div key={index} className='accordion-entry'>
      <span className='accordion-key'>{key}</span>: {value}
      </div>;
  });

  const className = `accordion ${open ? 'open' : 'closed'}`;
  return (
    <div className='accordion-container'>
      <div className= {className} onClick={onClick}>
        <div className='accordion-titles'>
          <div className='accordion-header'>{label}</div>
          <div className='accordion-subheader'>{subLabel}</div>
        </div>
        <div className='accordion-price'>{price}</div>
      </div>
      {open ? <div className='accordion-extension'>
          <div className='extension-header'>Extra Information</div>
          <img className='accordion-image' src={AspirinLogo} alt='Aspirin Logo'/>
          {extension}
          {isPharmacist ? <div className='accordion-button-container'>
            <div className='accordion-button'>
              <Button onClick={() => setEdit(true)} type='button'>
                <AiOutlineEdit size={20} color='#fff' />
                Edit
              </Button>
            </div>
          </div> : null}
      </div> : <></>}
      {isPharmacist ? <EditMedicine isOpen={edit} onClose={() => setEdit(false)} medicineDetails={medicineDetails}/> : null}
    </div>
  );
}

export default Accordion; 