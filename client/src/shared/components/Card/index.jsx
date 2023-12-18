import { React, useState } from "react";
import "./card.css";
import Button from "@mui/material/Button";
import "../../assets/aspirin.jpg";
import { useNavigate } from "react-router";
import Chip from "@mui/material/Chip";
import CancelIcon from "@mui/icons-material/Cancel";
import { red, green } from "@mui/material/colors";
import { FaArchive, FaArrowDown } from "react-icons/fa";
import { RiInboxUnarchiveFill } from "react-icons/ri";
import { AiOutlinePlus, AiOutlineEdit } from "react-icons/ai";
import { RiEditLine } from "react-icons/ri";

import { useArchiveMedicineMutation, useUnarchiveMedicineMutation } from "../../../store";
import EditMedicine from "../../../pharmacist/scenes/EditMedicine";
import { Divider } from "@mui/joy";

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
  isPharmacist = false,
  isArchived,
  healthPackage,
}) => {
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  const [archiveMedicine, results1] = useArchiveMedicineMutation();
  const [unarchiveMedicine, results2] = useUnarchiveMedicineMutation();
  const data = {
    price,
    name,
    description,
    quantity,
    medicinalUse,
    sales,
  };

  const archiveOnClick = async () => {
    await archiveMedicine({ medicineName: name });
  };

  const unarchiveOnClick = async () => {
    await unarchiveMedicine({ medicineName: name });
  };

  const handleClick = () => {
    onAddToCart({ name, description, price, sales, quantity, medicinalUse });
  };

  let newPrice = price;
  console.log("healthPackage: ", healthPackage);
  if (healthPackage !== undefined && healthPackage.package !== null) {
    // console.log("healthPackage: ", healthPackage);
    newPrice = price * (1 - healthPackage.package.pharmacyDiscount);
  }
  const findAltClick = () => {
    const filteredArray = similarMedicines.filter((medicine) => {
      return (
        medicine.activeIngredients[0] === mainActiveIngredient &&
        medicine.name !== name &&
        medicine.isOverTheCounter
      );
    });
    navigate("/patient/medicine/alternativesScreen", {
      state: { filteredArray },
    });
  };
  const bytesDegree = new Uint8Array(medicineImage.data.data);
  const blobDegree = new Blob([bytesDegree], {
    type: medicineImage.contentType,
  });
  const urlDegree = URL.createObjectURL(blobDegree);

  const buttons = (
    <>
      <Button className="add-button " onClick={handleClick} disabled={quantity === 0}>
        {quantity > 0 ? "Add to Cart" : "Sold Out"}
      </Button>
      {quantity > 0 ? null : (
        <Button className="add-button" onClick={findAltClick}>
          Find Alternatives
        </Button>
      )}
    </>
  );

  const toBeRenderedButtons = isOverTheCounter ? (
    buttons
  ) : (
    <Button className="add-button" disabled>
      {" "}
      Needs Prescription{" "}
    </Button>
  );

  return (
    <div className="max-w-xs bg-white shadow-sm rounded-lg hover:shadow-lg transition-shadow duration-300 ease-in-out group relative">
      {isPharmacist && isArchived === "archived" && (
        <span className="absolute top-0 left-0 bg-red-600 text-white text-xs font-bold py-1 px-3 rounded-bl-lg">
          Archived
        </span>
      )}
      <div className="relative">
        <div className="flex justify-center items-center">
          <img
            src={urlDegree}
            alt={name}
            className="h-auto max-w-full object-cover object-center py-4"
            style={{ maxWidth: "100px", maxHeight: "200px" }}
          />
        </div>
        <div className="mr-4 ml-4">
          <Divider inset="none" />
        </div>
        {isPharmacist && (
          <div className="absolute top-3 right-3 flex space-x-2 z-10">
            <button
              onClick={isArchived !== "archived" ? archiveOnClick : unarchiveOnClick}
              type="button"
              className="text-black font-medium rounded-full p-2 text-xs hover:bg-gray-200"
            >
              {isArchived !== "archived" ? (
                <FaArchive size={16} />
              ) : (
                <RiInboxUnarchiveFill size={16} />
              )}
            </button>

            <button
              onClick={() => setEdit(true)}
              type="button"
              className="text-black font-medium rounded-full p-2 text-xs hover:bg-gray-200"
            >
              <AiOutlineEdit size={16} />
            </button>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-black font-bold text-lg truncate">{name}</h3>
        <div className="flex justify-between items-center mt-2">
          <div>
            {isPharmacist ? (
              <div>
                <span className="text-gray-900 font-semibold">${price}</span>
              </div>
            ) : (
              <div className="flex items-baseline space-x-2">
                {newPrice !== price ? (
                  <>
                    <span className="text-gray-500 line-through">${price}</span>
                    <span className="text-red-600 text-xl font-semibold">${newPrice}</span>
                  </>
                ) : (
                  <span className="text-gray-900 text-xl font-semibold">${price}</span>
                )}
              </div>
            )}
          </div>
          {isPharmacist && (
            <div className="text-gray-500 text-xs">
              <p>Stock: {quantity}</p>
              <p>Sold: {sales}</p>
            </div>
          )}
        </div>
        <p className="text-gray-600 text-sm mt-3">{description}</p>
      </div>

      {!isPharmacist && <div className="flex justify-center">{toBeRenderedButtons}</div>}

      {isPharmacist && edit && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-10 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-xl z-50 p-4">
            <button onClick={() => setEdit(false)} className="float-right mr-2 mt-2"></button>
            <EditMedicine
              isOpen={edit}
              onClose={() => setEdit(false)}
              medicineDetails={data}
              isOverTheCounter={isOverTheCounter}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
