import * as React from 'react';
import './item.css';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import QuantityInput from './quantityField';


export default function DrawerItem({name,description,price,quantity,onDelete, quantityInc, quantityDec, medicineImage}) {
  const bytesDegree = new Uint8Array(medicineImage.data.data);
   const blobDegree = new Blob([bytesDegree], { type: medicineImage.contentType });
   const urlDegree = URL.createObjectURL(blobDegree);
  const handleDelete = () => {
    onDelete();
   };
   const handleQuanInc = (newQuantity) => {
    quantityInc(newQuantity);
   };
   const handleQuanDec = (newQuantity) => {
    quantityDec(newQuantity);
   };
  return (
    <div className="container2">

        <div className="image2">
        <img
    src={urlDegree}
  alt={name}
   />
      </div>

      <div className="product-details2">
        <div className='nameWithPrice2'>
          <h3 className="product-name2">{name}</h3>
          <p className="product-price2">${price}</p>
          {/* <p className="product-description2">{description}</p> */}
        </div>
        <div>
        {/* <p className="product-quantity">{quantity}</p> */}
        {/* <QuantityInput initialValue={quantity} onIncrement={handleInc} /> */}
        <QuantityInput initialValue={quantity} onIncrement={handleQuanInc} onDecrement={handleQuanDec} />

        </div>
        <Button onClick={handleDelete} variant="outlined" startIcon={<DeleteIcon />}>Delete</Button>
      </div>
       
    </div>
  );
}
