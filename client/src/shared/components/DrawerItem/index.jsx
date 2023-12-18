import * as React from "react";
// import "./item.css";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import QuantityInput from "./quantityField";

export default function DrawerItem({
  name,
  description,
  price,
  quantity,
  onDelete,
  quantityInc,
  quantityDec,
  medicineImage,
  healthPackage,
}) {
  const bytesDegree = new Uint8Array(medicineImage.data.data);
  const blobDegree = new Blob([bytesDegree], {
    type: medicineImage.contentType,
  });
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
  let newPrice = price;
  console.log("healthPackage: ", healthPackage);
  if (healthPackage !== undefined && healthPackage.package !== null) {
    // console.log("healthPackage: ", healthPackage);
    newPrice = price * (1 - healthPackage.package.pharmacyDiscount);
  }
  return (
    <div className="container2">
      <div className="image2">
        <img src={urlDegree} alt={name} />
      </div>

      <div className="product-details2">
        <div className="nameWithPrice2">
          <h3 className="text-xl font-medium mt-1">{name}</h3>
          <p className="text-2xl font-normal">${newPrice}</p>
        </div>
        <div>
          <QuantityInput
            initialValue={quantity}
            onIncrement={handleQuanInc}
            onDecrement={handleQuanDec}
          />
        </div>
        <Button
          onClick={handleDelete}
          variant="outlined"
          startIcon={<DeleteIcon />}
          className="mb-10"
          color="error"
        >
          Delete item
        </Button>
      </div>
    </div>
  );
}
