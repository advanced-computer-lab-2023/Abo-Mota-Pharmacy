
import React from 'react';
import panadol from './panadol.jpeg';
import './card.css';
import { medicines } from '../../assets/mockdata';
 

const ProductCard = ({name,description,price,extras}) => {
  return (
  <div className="container"> 
    <div className="product-card">
      <img src={panadol} alt={name} className="product-image" />
      <div className="product-details">
        <h3 className="product-name">{name}</h3>
        <p className="product-description">{description}</p>
        <p className="product-price">{price}</p>
        <p className="extras">Sold: {extras.sales}</p>
        <p className="extras">In Stock: {extras.availableQuantity}</p>
        <p className="extras">Use: {extras.medicinalUse}</p>
      </div>
    </div>
  </div>  
  );
};


export default ProductCard;