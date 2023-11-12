import * as React from 'react';

import './styles.css';

export default function OrderItems({name,description,price,quantity}){
    return (
        <div className="container2">
    
            <div className="image2">
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
       />
          </div>
    
          <div >
            {/* <div className='text-part'> */}
              <h3 className="product-name2">{name}</h3>
              <p className="product-price2">${price}</p>
              <p className="product-description2">{description}</p>
              <p className="product-quantity">x{quantity}</p>
            {/* </div> */}
            </div>
        </div>
    );
}