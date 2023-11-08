import React, { useState } from "react";
import ProductCard from "../shared/components/Card";
import './style.css';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Button } from "@mui/material";
import TempDrawer from "../shared/components/Drawer";
import DrawerItem from "../shared/components/DrawerItem";


const Filter = (props) => {
    const [selectedMedicinalUse, setSelectedMedicinalUse] = useState("all");
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [cart, setCart] = useState([]);


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
        console.log('Adding to cart:', medicine.name);
        // Create a copy of the current cart state
        const updatedCart = [...cart];
      
        // Check if the product already exists in the cart
        const existingItem = updatedCart.find((item) => item.name === medicine.name);
      
        if (existingItem) {
          // If the product is already in the cart, update its quantity
          existingItem.quantity += 1;
        } else {
          // If the product is not in the cart, add it with a quantity of 1
          const newItem = {
            name: medicine.name,
            price: medicine.price,
            quantity: 1,
          };
          updatedCart.push(newItem);
        }
    
        setCart(updatedCart);
      };
      
 
      const handleDeleteItem = (medicine) => {
        //new cart without the removed med
        const updatedCart = cart.filter((item) => item.name !== medicine.name);
        setCart(updatedCart);
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
            <TempDrawer isOpen={isDrawerOpen} closeDrawer={closeDrawer} cartItems={cart} onDeleteItem={handleDeleteItem} />

            {/* <TempDrawer isOpen={isDrawerOpen} closeDrawer={closeDrawer}>
                {cart.map((medicine, index) => (
                <DrawerItem
                    // key={index}
                    name={medicine.name}
                    description={medicine.description}
                    price={medicine.price}
                    quantity={medicine.quantity}
                />
                ))}
            </TempDrawer> */}
                     
        </div>
    );
}

export default Filter;
