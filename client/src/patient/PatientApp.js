import React from "react";
import { Routes, Route } from "react-router-dom";
import MedList from "./MedList";
import RegisterScreen from "./scenes/RegisterScreen";
import NavBar from "../shared/components/NavBar";
import { useGetMedicinesQuery } from "../store";
import MedicineScreen from "./scenes/MedicineScreen";
import Checkout from "./Checkout";
import Order from "./Order";
import OrderCard from "./Order";
import MyOrders from "./myOrders";
import ChangePasswordScreen from "../shared/pages/ChangePasswordScreen";
import AlternativesScreen from "./scenes/AlternativesScreen/AlternativesScreen";
import ViewSettings from "./scenes/ViewSettings";
import ConnectAccountForm from "./scenes/ConnectAccountsForm";
import PrescriptionsScreen from "./scenes/PrescriptionsScreen";
import Chat from "../shared/pages/Chat";

function PatientApp({ socket }) {
  const links = [
    { name: "Shop Medicines", to: "/patient/medicine" },
    { name: "View My Orders", to: "/patient/myOrders" },
    { name: "View Account", to: "/patient/viewSettings" },
    { name: "Prescription", to: "/patient/prescription" },
    { name: "Chat", to: "/patient/chat" },
  ];
  // console.log(data);
  return (
    <div className="flex flex-col" style={{ minHeight: '100vh' }}>
      <NavBar links={links} />
      <Routes>
        <Route path='medicine' element={<MedList />} />
        <Route path='medicine2' element={<MedicineScreen />} />
        <Route path='checkout' element={<Checkout />} />
        <Route path='/order' element={<OrderCard />} />
        <Route path='/myOrders' element={<MyOrders />} />
        <Route path='/viewSettings' element={<ViewSettings />} />
        <Route path='/prescription' element={<PrescriptionsScreen />} />
        <Route
          path='/medicine/alternativesScreen'
          element={<AlternativesScreen />}
        />
        <Route path='/connectAccountForm' element={<ConnectAccountForm />} />
        <Route
          path='/changePassword'
          element={<ChangePasswordScreen isPatient />}
        />
        <Route path='/chat/:contact?' element={<Chat socket={socket} />} />
        {/* </Route> */}
      </Routes>
    </div>
  );
}

export default PatientApp;
