import React, { useState } from "react";
import ProductCard from "../shared/components/Card";
import './style.css';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Button } from "@mui/material";
import TempDrawer from "../shared/components/Drawer";


const Filter = ({medicines}) => {
    const [selectedMedicinalUse, setSelectedMedicinalUse] = useState("all");
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [cart, setCart] = useState([]);


    const filterMedicinesByMedicinalUse = (medicinalUse) => {
        setSelectedMedicinalUse(medicinalUse);
      };
    
      const filteredArray = medicines.filter((medicine) => {
        return (
          medicine.extras.medicinalUse === selectedMedicinalUse ||
          selectedMedicinalUse === "all"
        );
      });

      // const mappedOrders = cart.map((cartItem, index) => (
      //   <OrderCard key={index} cartItem={cartItem} />
      // ));

      const handleAddToCart = (medicine) => {
        if (medicine.extras.availableQuantity > 0) {
          const updatedCart = [...cart];
      
          const existingItem = updatedCart.find((item) => item.name === medicine.name);
      
          if (existingItem) {
            existingItem.quantity += 1;
          } else {
            const newItem = {
              name: medicine.name,
              price: medicine.price,
              quantity: 1,
            };
            updatedCart.push(newItem);
          }
      
          setCart(updatedCart);
        }
      };
      
      
      const handleQuantityInc = (medicine) => {
        const updatedCart = [...cart];
        const toChange = updatedCart.find((item) => item.name === medicine.name);
      
        if (toChange) {
          toChange.quantity++;
        }
        setCart(updatedCart);
        console.log("new quantity of ", medicine.name, "is: " , medicine.quantity);
      };

      const handleQuantityDec = (medicine) => {
        const updatedCart = [...cart];
        const toChange = updatedCart.find((item) => item.name === medicine.name);
      
        if (toChange) {
          toChange.quantity--;
        }
        setCart(updatedCart);
        console.log("new quantity of ", medicine.name, "is: " , medicine.quantity);
      };
      

      const handleDeleteItem = (medicine) => {
        //new cart without the removed med
        const updatedCart = cart.filter((item) => item.name !== medicine.name);
        setCart(updatedCart);
      };

      const handleCartIcon = () => {
        setIsDrawerOpen(true); 
    };

    const closeDrawer = () => {
        setIsDrawerOpen(false); 
    };
      
    const mappedArray = filteredArray.map((medicine) => {
        return (
            <ProductCard
                name={medicine.name}
                description={medicine.description}
                price={medicine.price}
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
            <TempDrawer isOpen={isDrawerOpen} closeDrawer={closeDrawer} cartItems={cart} onDeleteItem={handleDeleteItem} onQuantityInc={handleQuantityInc} onQuantityDec={handleQuantityDec} />
                     
        </div>
    );
}

export default Filter;
