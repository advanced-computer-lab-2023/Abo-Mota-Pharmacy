import { useState } from "react"
import './styles.css'
function DateInput ({label, id, error, touch, type='date', ...probs}){
  const [value, setValue] = useState('');
  const handleChange = (event) => {
    setValue(event.target.value);
  }
  return (
    <div className= 'date-input'>
      <label htmlFor={label}>{label}</label>
      <div className="input-data">
        <input id={label} name={label} type={type} {...probs}/>
      </div>
      {error && touch ? <div className="input-error"> {error} </div>: null}
    </div>
  );
}

export default DateInput;