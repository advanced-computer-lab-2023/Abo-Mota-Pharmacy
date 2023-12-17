import React, { useState } from "react";
import ProductCard from "../../shared/components/Card";
import "./style.css";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";

const Filter = ({ medicines }) => {
  const [selectedMedicinalUse, setSelectedMedicinalUse] = useState("all");

  const filterMedicinesByMedicinalUse = (medicinalUse) => {
    setSelectedMedicinalUse(medicinalUse);
  };

  const filteredArray = medicines.filter((medicine) => {
    return (
      medicine.medicinalUse === selectedMedicinalUse ||
      selectedMedicinalUse === "all"
    );
  });

  const mappedArray = filteredArray.map((medicine) => {
    return (
      <ProductCard
        name={medicine.name}
        description={medicine.description}
        price={medicine.price}
        sales={medicine.sales}
        quantity={medicine.quantity}
        medicinalUse={medicine.medicinalUse}
        mainActiveIngredient={medicine.activeIngredients[0]}
        medicineImage={medicine.medicineImage}
        isOverTheCounter={medicine.isOverTheCounter}
        isPharmacist={true}
        isArchived={medicine.status}
      />
    );
  });

  return (
    <div>
      <div id="myBtnContainer">
        <button
          className={`btn ${selectedMedicinalUse === "all" ? "active" : ""}`}
          onClick={() => filterMedicinesByMedicinalUse("all")}
        >
          Show all
        </button>
        <button
          className={`btn ${
            selectedMedicinalUse === "Antiviral" ? "active" : ""
          }`}
          onClick={() => filterMedicinesByMedicinalUse("Antiviral")}
        >
          Antiviral
        </button>
        <button
          className={`btn ${
            selectedMedicinalUse === "Antifungal" ? "active" : ""
          }`}
          onClick={() => filterMedicinesByMedicinalUse("Antifungal")}
        >
          Antifungal
        </button>
        <button
          className={`btn ${
            selectedMedicinalUse === "Antipyretic" ? "active" : ""
          }`}
          onClick={() => filterMedicinesByMedicinalUse("Antipyretic")}
        >
          Antipyretic
        </button>
        <button
          className={`btn ${
            selectedMedicinalUse === "Pain Reliever" ? "active" : ""
          }`}
          onClick={() => filterMedicinesByMedicinalUse("Pain Reliever")}
        >
          Pain Reliever
        </button>
        <button
          className={`btn ${
            selectedMedicinalUse === "Antibiotic" ? "active" : ""
          }`}
          onClick={() => filterMedicinesByMedicinalUse("Antibiotic")}
        >
          Antibiotic
        </button>

        <button
          className={`btn ${
            selectedMedicinalUse === "Antiseptic" ? "active" : ""
          }`}
          onClick={() => filterMedicinesByMedicinalUse("Antiseptic")}
        >
          Antiseptic
        </button>
        <button
          className={`btn ${
            selectedMedicinalUse === "Antispasmodic" ? "active" : ""
          }`}
          onClick={() => filterMedicinesByMedicinalUse("Antispasmodic")}
        >
          Antispasmodic
        </button>
        <button
          className={`btn ${
            selectedMedicinalUse === "Antihistamine" ? "active" : ""
          }`}
          onClick={() => filterMedicinesByMedicinalUse("Antihistamine")}
        >
          Antihistamine
        </button>
        <button
          className={`btn ${
            selectedMedicinalUse === "Anti-inflammatory" ? "active" : ""
          }`}
          onClick={() => filterMedicinesByMedicinalUse("Anti-inflammatory")}
        >
          Anti-inflammatory
        </button>
        <button
          className={`btn ${
            selectedMedicinalUse === "Diuretic" ? "active" : ""
          }`}
          onClick={() => filterMedicinesByMedicinalUse("Diuretic")}
        >
          Diuretic
        </button>
      </div>
  
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 mx-4">
        {mappedArray}
      </div>
    </div>
  );
};

export default Filter;
