import React, { useState } from "react";
import { medicines } from "../shared/assets/mockdata";
import ProductCard from "../shared/components/Card";
import ProductsGrid from "./MedList";
import './style.css';
//import '../shared/components/Card/card.css';


const Filter = (props) => {
    const [selectedMedicinalUse, setSelectedMedicinalUse] = useState("all");
    // Initialize the filteredMedicines state variable with all medicines
    //const [filteredMedicines, setFilteredMedicines] = useState(props.mappedArray);


    const filterMedicinesByMedicinalUse = (medicinalUse) => {
        setSelectedMedicinalUse(medicinalUse);
      };
    
      const filteredArray = props.propArray.filter((medicine) => {
        return (
          medicine.extras.medicinalUse === selectedMedicinalUse ||
          selectedMedicinalUse === "all"
        );
      });
      
    const mappedArray = filteredArray.map((medicine) => {
        return (
            <ProductCard
                name={medicine.name}
                description={medicine.description}
                price={`$${medicine.price}`}
                extras={medicine.extras}
            />
        );
    });
    
    return (
        <div>
            <div id="myBtnContainer">
                <button className={`btn ${selectedMedicinalUse === "all" ? "active" : ""}`} onClick={() => filterMedicinesByMedicinalUse('all')}>Show all</button>
                <button className={`btn ${selectedMedicinalUse === "Antiviral" ? "active" : ""}`} onClick={() => filterMedicinesByMedicinalUse('Antiviral')}>Antiviral</button>
                <button className={`btn ${selectedMedicinalUse === "Antifungal" ? "active" : ""}`} onClick={() => filterMedicinesByMedicinalUse('Antifungal')}>Antifungal</button>
                <button className={`btn ${selectedMedicinalUse === "Antipyretic" ? "active" : ""}`} onClick={() => filterMedicinesByMedicinalUse('Antipyretic')}>Antipyretic</button>
                <button className={`btn ${selectedMedicinalUse === "Pain Reliever" ? "active" : ""}`} onClick={() => filterMedicinesByMedicinalUse('Pain Reliever')}>Pain Reliever</button>
                <button className={`btn ${selectedMedicinalUse === "Antibiotic" ? "active" : ""}`} onClick={() => filterMedicinesByMedicinalUse('Antibiotic')}>Antibiotic</button>
            </div>
            <div className="container">
                {mappedArray};
            </div>         
        </div>
    );
}

export default Filter;
