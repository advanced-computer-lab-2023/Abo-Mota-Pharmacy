import React from "react";
import { Routes, Route } from "react-router-dom";
import MedList from "./MedList";
import NavBar from "../shared/components/NavBar";
import MedicineScreen from "./scenes/MedicineScreen";
import Checkout from "./Checkout";
import OrderCard from "./Order";
import MyOrders from "./myOrders";
import ChangePasswordScreen from "../shared/pages/ChangePasswordScreen";
import AlternativesScreen from "./scenes/AlternativesScreen/AlternativesScreen";
import ViewFinancials from "./scenes/ViewFinancials";
import ConnectAccountForm from "./scenes/ConnectAccountsForm";
function PatientApp({socket}) {
  const links = [
    { name: "Shop Medicines", to: "/patient/medicine" },
    { name: "View My Orders", to: "/patient/myOrders" },
    { name: "Change password", to: "/patient/changePassword" },
    { name: "View Financials", to: "/patient/viewFinancials" },
    { name: "Connect Account Form", to: "/patient/connectAccountForm" },
  ];
  // console.log(data);
  return (
    <div>
      <NavBar links={links} socket={socket}/>
      <Routes>
        <Route path="medicine" element={<MedList socket={socket}/>} />
        <Route path="medicine2" element={<MedicineScreen />} />
        <Route path="checkout" element={<Checkout socket={socket}/>} />
        <Route path="/order" element={<OrderCard />} />
        <Route path="/myOrders" element={<MyOrders />} />
        <Route path="/viewFinancials" element={<ViewFinancials />} />
        <Route path="/medicine/alternativesScreen" element={<AlternativesScreen />} />
        <Route path="/connectAccountForm" element={<ConnectAccountForm />} />
        <Route path="/changePassword" element={<ChangePasswordScreen isPatient />} />
        {/* </Route> */}
      </Routes>
    </div>
  );
}

export default PatientApp;
