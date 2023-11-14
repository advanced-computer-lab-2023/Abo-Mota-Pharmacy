import * as React from 'react';
import './styles.css';

export default function OrderItems({name,price,quantity,medicineImage}){
  const bytesDegree = new Uint8Array(medicineImage.data.data);
  const blobDegree = new Blob([bytesDegree], { type: medicineImage.contentType });
  const urlDegree = URL.createObjectURL(blobDegree);
    return (
        <div className="container2">
    
            <div className="image2">
            <img src={urlDegree} alt={name} />
          </div>
    
          <div >
            {/* <div className='text-part'> */}
              <h3 className="product-name2">{name}</h3>
              <p className="product-price2">${price}</p>
              {/* <p className="product-description2">{description}</p> */}
              <p className="product-quantity">x{quantity}</p>
            {/* </div> */}
            </div>
        </div>
    );
}