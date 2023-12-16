import React from "react";
import "./card.css";
import Button from "@mui/material/Button";
import "../../assets/aspirin.jpg";
import { useState } from "react";
import { useNavigate } from "react-router";

const ProductCard = ({
  name,
  description,
  price,
  sales,
  quantity,
  medicinalUse,
  onAddToCart,
  medicineImage,
  mainActiveIngredient,
  similarMedicines,
  isOverTheCounter,
  isPrescribed,
}) => {
  const handleClick = () => {
    onAddToCart({ name, description, price, sales, quantity, medicinalUse });
  };
  const navigate = useNavigate();

  const findAltClick = () => {
    const filteredArray = similarMedicines.filter((medicine) => {
      console.log("medsssssssssssss: ", medicine.isOverTheCounter);
      return (
        medicine.activeIngredients[0] === mainActiveIngredient &&
        medicine.name !== name &&
        medicine.isOverTheCounter
      );
    });
    navigate("/patient/medicine/alternativesScreen", {
      state: { filteredArray },
    });
    console.log(mainActiveIngredient);
    console.log(filteredArray);
  };
  const bytesDegree = new Uint8Array(medicineImage.data.data);
  const blobDegree = new Blob([bytesDegree], {
    type: medicineImage.contentType,
  });
  const urlDegree = URL.createObjectURL(blobDegree);

  const buttons = (
    <>
      <Button
        className='add-button'
        onClick={handleClick}
        disabled={quantity === 0}
      >
        {quantity > 0 ? "Add to Cart" : "Sold Out"}
      </Button>
      {quantity > 0 ? null : (
        <Button className='add-button' onClick={findAltClick}>
          Find Alternatives
        </Button>
      )}
    </>
  );

  const toBeRenderedButtons = isOverTheCounter ? (
    buttons
  ) : isPrescribed ? (
    buttons
  ) : (
    <Button className='add-button' disabled>
      {" "}
      Needs Prescription{" "}
    </Button>
  );
  return (
    // <div className="container">
    <div className='product-card'>
      <img
        //src={`data:${medicine.medicineImage.contentType};base64, ${Buffer.from(medicine.medicineImage.data).toString('base64')}`}
        src={urlDegree}
        alt={name}
        className='product-image'
      />

      <div className='product-details'>
        <div className='nameWithPrice'>
          <h3 className='product-name'>{name}</h3>
          <p className='product-price'>${price}</p>
        </div>
        <p className='product-description'>{description}</p>
        {/* <p className="extras">→ Sold: {sales}</p>
        <p className="extras">→ In Stock: {quantity}</p> */}
        <p className='extras'>→ Use: {medicinalUse}</p>
      </div>
      <div className='button-div'>{toBeRenderedButtons}</div>
    </div>
    // </div>
  );
};

export default ProductCard;
