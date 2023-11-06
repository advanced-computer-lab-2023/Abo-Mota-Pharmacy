import React, { useState } from "react";
import { medicines } from "../shared/assets/mockdata";
import ProductCard from "../shared/components/Card";
import ProductsGrid from "./MedList";
import './style.css';
import Drawer from '@mui/material/Drawer';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Button } from "@mui/material";
import TempDrawer from "../shared/components/Drawer";


const Filter = (props) => {
    const [selectedMedicinalUse, setSelectedMedicinalUse] = useState("all");
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);


    const filterMedicinesByMedicinalUse = (medicinalUse) => {
        setSelectedMedicinalUse(medicinalUse);
      };
    
      const filteredArray = props.propArray.filter((medicine) => {
        return (
          medicine.extras.medicinalUse === selectedMedicinalUse ||
          selectedMedicinalUse === "all"
        );
      });


      const handleAddToCart = (medicine) => {
        //take medicine info to cart
        console.log('Add to cart clicked on card:', medicine.name);
      };

      const handleCartIcon = () => {
        setIsDrawerOpen(true); // Open the Drawer
    };

    const closeDrawer = () => {
        setIsDrawerOpen(false); // Close the Drawer
    };
      
    const mappedArray = filteredArray.map((medicine) => {
        return (
            <ProductCard
                name={medicine.name}
                description={medicine.description}
                price={`$${medicine.price}`}
                extras={medicine.extras}
                onAddToCart={handleAddToCart}
            />
        );
    });

    
    
    return (
        <div>
            <div className="cart-div">
                <ShoppingCartOutlinedIcon  />
                <Button className="add-button" onClick={handleCartIcon}>Cart</Button>
            </div>
            
            <div id="myBtnContainer">
                
                <button className={`btn ${selectedMedicinalUse === "all" ? "active" : ""}`} onClick={() => filterMedicinesByMedicinalUse('all')}>Show all</button>
                <button className={`btn ${selectedMedicinalUse === "Antiviral" ? "active" : ""}`} onClick={() => filterMedicinesByMedicinalUse('Antiviral')}>Antiviral</button>
                <button className={`btn ${selectedMedicinalUse === "Antifungal" ? "active" : ""}`} onClick={() => filterMedicinesByMedicinalUse('Antifungal')}>Antifungal</button>
                <button className={`btn ${selectedMedicinalUse === "Antipyretic" ? "active" : ""}`} onClick={() => filterMedicinesByMedicinalUse('Antipyretic')}>Antipyretic</button>
                <button className={`btn ${selectedMedicinalUse === "Pain Reliever" ? "active" : ""}`} onClick={() => filterMedicinesByMedicinalUse('Pain Reliever')}>Pain Reliever</button>
                <button className={`btn ${selectedMedicinalUse === "Antibiotic" ? "active" : ""}`} onClick={() => filterMedicinesByMedicinalUse('Antibiotic')}>Antibiotic</button>
                
            </div>
            <div className="container">
                {mappedArray}
            </div>
            <TempDrawer isOpen={isDrawerOpen} closeDrawer={closeDrawer} />
                     
        </div>
    );
}

export default Filter;
