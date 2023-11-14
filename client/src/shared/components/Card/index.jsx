import React from 'react';
import './card.css';
import Button from '@mui/material/Button';
 

const ProductCard = ({name,description,price,sales,quantity,medicinalUse,onAddToCart}) => {
  const handleClick = () => {
    onAddToCart({ name, description, price, sales,quantity,medicinalUse });   
   };

  return (
  // <div className="container"> 
    <div className="product-card">
      <img
    src={
    name === 'Paracetamol'
      ? 'https://i-cf65.ch-static.com/content/dam/cf-consumer-healthcare/panadol-reborn/en_IE/product-detail/panadol-advance-compack-16/Panadol-Base-24s-(3D).png?auto=format'
      : name === 'Ibuprofen'
      ? 'https://www.chemist-4-u.com/media/catalog/product/b/m/bmv_-_ibuprofen_200mg_-_32_tablets_-_mockup.jpg'
      : name === 'Amoxicillin'
      ? 'https://cdn.nhathuoclongchau.com.vn/unsafe/https://cms-prod.s3-sgn09.fptcloud.com/00000967_augmentin_625mg_6131_63aa_large_1501bb6e47.jpg'
      : name === 'Cetirizine'
      ? 'https://www.chemist-4-u.com/media/catalog/product/b/m/bmv_-_cetirizine_10mg_-_hay_fever_allergy_relief_-_180_tablets_-_front_face_mockup_1_.jpg'
      : name === 'Aspirin'
      ? 'https://www.binsina.ae/media/catalog/product/m/48932_1.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=300&width=300&canvas=300:300'
      : ''
  }
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
        <Button className="add-button" onClick={handleClick} disabled={quantity === 0}>{quantity > 0 ? "Add to Cart" : "Sold Out"}</Button>
      </div>
    </div>
  // </div>  
  );
}


export default ProductCard;