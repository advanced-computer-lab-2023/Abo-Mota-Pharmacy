import React, { useState } from "react";
import ProductCard from "../shared/components/Card";
import './style.css';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Button } from "@mui/material";
import TempDrawer from "../shared/components/Drawer";
import { useAddToCartMutation, useGetPatientQuery, useRemoveFromCartMutation } from "../store";

const Filter = ({ medicines }) => {
  const [selectedMedicinalUse, setSelectedMedicinalUse] = useState("all");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  // const [cart, setCart] = useState([]);

  const { data: patient, isFetching, error } = useGetPatientQuery();
  
  const [addToCart] = useAddToCartMutation();
  const [removeFromCart] = useRemoveFromCartMutation();

  if (isFetching)
    return <div>Loading...</div>;

  let cart = patient?.cart || [];

  console.log("Original cart", cart);


  cart = cart.map((cartItem) => {

    console.log("CartItem in Map", cartItem)

    const { medicine, quantity } = cartItem;

    return {
      name: medicine.name,
      price: medicine.price,
      description: medicine.description,
      medicineImage: medicine.medicineImage,
      quantity,
    };
  });

  console.log("Cart", cart);


  const filterMedicinesByMedicinalUse = (medicinalUse) => {
    setSelectedMedicinalUse(medicinalUse);
  };

  const filteredArray = medicines.filter((medicine) => {
    return (
      medicine.medicinalUse === selectedMedicinalUse ||
      selectedMedicinalUse === "all"
    );
  });

  // const mappedOrders = cart.map((cartItem, index) => (
  //   <OrderCard key={index} cartItem={cartItem} />
  // ));

  const handleAddToCart = (item) => {
    // if (medicine.quantity > 0) {
    //   const updatedCart = [...cart];

    //   const existingItem = updatedCart.find((item) => item.name === medicine.name);

    //   if (existingItem) {
    //     existingItem.quantity += 1;
    //   } else {
    //     const newItem = {
    //       name: medicine.name,
    //       price: medicine.price,
    //       quantity: 1,
    //     };
    //     updatedCart.push(newItem);
    //   }

    // }

    console.log("Item @ Filter.jsx", item);

    addToCart({
      name: item.medicine.name,
    });
  };


  const handleQuantityInc = (medicine) => {
    // const updatedCart = [...cart];
    // const toChange = updatedCart.find((item) => item.name === medicine.name);

    // if (toChange) {
    //   toChange.quantity++;
    // }
    // setCart(updatedCart);
    // console.log("new quantity of ", medicine.name, "is: ", medicine.quantity);

    addToCart({
      name: medicine.name,
    });
  };

  const handleQuantityDec = (medicine) => {
    // const updatedCart = [...cart];
    // const toChange = updatedCart.find((item) => item.name === medicine.name);

    // if (toChange) {
    //   toChange.quantity--;
    // }
    // setCart(updatedCart);
    // console.log("new quantity of ", medicine.name, "is: ", medicine.quantity);

    removeFromCart({
      name: medicine.name,
      quantity: 1,
    });
  };


  const handleDeleteItem = (medicine) => {
    // new cart without the removed med
    // const updatedCart = cart.filter((item) => item.name !== medicine.name);
    // setCart(updatedCart);

    removeFromCart({
      name: medicine.name,
      quantity: medicine.quantity,
    });
  };

  const handleCartIcon = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  // medicine



  const mappedArray = filteredArray.map((medicine) => {
    return (
      <ProductCard
        name={medicine.name}
        description={medicine.description}
        price={medicine.price}
        sales={medicine.sales}
        quantity={medicine.quantity}
        medicinalUse={medicine.medicinalUse}
        onAddToCart={
          () => { handleAddToCart({ medicine }) }
        }
        medicineImage={medicine.medicineImage}
      />
    );
  });


  return (
    <div>
      <div className="cart-div">
        <ShoppingCartOutlinedIcon />
        <Button className="add-button" onClick={handleCartIcon}>Cart</Button>
      </div>

      <div id="myBtnContainer">

        <button className={`btn ${selectedMedicinalUse === "all" ? "active" : ""}`} onClick={() => filterMedicinesByMedicinalUse('all')}>Show all</button>
        <button className={`btn ${selectedMedicinalUse === "Antiviral" ? "active" : ""}`} onClick={() => filterMedicinesByMedicinalUse('Antiviral')}>Antiviral</button>
        <button className={`btn ${selectedMedicinalUse === "Antifungal" ? "active" : ""}`} onClick={() => filterMedicinesByMedicinalUse('Antifungal')}>Antifungal</button>
        <button className={`btn ${selectedMedicinalUse === "Antipyretic" ? "active" : ""}`} onClick={() => filterMedicinesByMedicinalUse('Antipyretic')}>Antipyretic</button>
        <button className={`btn ${selectedMedicinalUse === "Pain Reliever" ? "active" : ""}`} onClick={() => filterMedicinesByMedicinalUse('Pain Reliever')}>Pain Reliever</button>
        <button className={`btn ${selectedMedicinalUse === "Antibiotic" ? "active" : ""}`} onClick={() => filterMedicinesByMedicinalUse('Antibiotic')}>Antibiotic</button>

        <button className={`btn ${selectedMedicinalUse === "Antiseptic" ? "active" : ""}`} onClick={() => filterMedicinesByMedicinalUse('Antiseptic')}>Antiseptic</button>
        <button className={`btn ${selectedMedicinalUse === "Antispasmodic" ? "active" : ""}`} onClick={() => filterMedicinesByMedicinalUse('Antispasmodic')}>Antispasmodic</button>
        <button className={`btn ${selectedMedicinalUse === "Antihistamine" ? "active" : ""}`} onClick={() => filterMedicinesByMedicinalUse('Antihistamine')}>Antihistamine</button>
        <button className={`btn ${selectedMedicinalUse === "Anti-inflammatory" ? "active" : ""}`} onClick={() => filterMedicinesByMedicinalUse("Anti-inflammatory")}>Anti-inflammatory</button>
        <button className={`btn ${selectedMedicinalUse === "Diuretic" ? "active" : ""}`} onClick={() => filterMedicinesByMedicinalUse('Diuretic')}>Diuretic</button>


      </div>
      <div className="container">
        {mappedArray}
      </div>

      <TempDrawer
        isOpen={isDrawerOpen}
        closeDrawer={closeDrawer}
        cartItems={cart}
        onDeleteItem={handleDeleteItem}
        onQuantityInc={handleQuantityInc}
        onQuantityDec={handleQuantityDec}
        medicines={medicines} />

    </div>
  );
}

export default Filter;
