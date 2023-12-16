import React from 'react';
import './card.css';
import Button from '@mui/material/Button';
import '../../assets/aspirin.jpg';
 
const ProductCard = ({name,description,price,sales,quantity,medicinalUse,onAddToCart,medicineImage}) => {
  const handleClick = () => {
    onAddToCart();   
   };
   const bytesDegree = new Uint8Array(medicineImage.data.data);
   const blobDegree = new Blob([bytesDegree], { type: medicineImage.contentType });
   const urlDegree = URL.createObjectURL(blobDegree);
  return (
  // <div className="container"> 
    <div className="product-card">
      <img
    //src={`data:${medicine.medicineImage.contentType};base64, ${Buffer.from(medicine.medicineImage.data).toString('base64')}`}
        src={urlDegree}
        alt={name}
        className="product-image"
        />

      <div className="product-details">
        <div className='nameWithPrice'>
        <h3 className="product-name">{name}</h3>
        <p className="product-price">${price}</p>
        </div>
        <p className="product-description">{description}</p>
        {/* <p className="extras">→ Sold: {sales}</p>
        <p className="extras">→ In Stock: {quantity}</p> */}
        <p className="extras">→ Use: {medicinalUse}</p>
        
      </div>
      <div className="button-div">
        <Button className="add-button" onClick={onAddToCart} disabled={quantity === 0}>{quantity > 0 ? "Add to Cart" : "Sold Out"}</Button>
      </div>
    </div>
  // </div>  
  );
}


export default ProductCard;