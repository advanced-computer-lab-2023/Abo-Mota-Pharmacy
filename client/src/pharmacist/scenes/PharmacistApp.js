import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import RegisterForm from "./RegisterForm";
import MedicineScreen from "./MedicineScreen";
import AddMedicine from "./AddMedicine";
import NavBar from "../../shared/components/NavBar";
import ChangePasswordScreen from "../../shared/pages/ChangePasswordScreen";
import SalesReport from "../../shared/pages/SalesReport";
import ViewSettings from "./ViewSettings";
import Chat from "../../shared/pages/Chat";

function PharmacistApp({ socket }) {
  const links = [
    { name: "Change App", to: "/" },
    { name: "Register", to: "/pharmacist/registerPharmacist" },
    { name: "Medicine Inventory", to: "/pharmacist/medicine" },
    { name: "View Settings", to: "/pharmacist/viewSettings" },
    { name: "Sales Report", to: "/pharmacist/salesReport" },
    { name: "Chat", to: "/pharmacist/chat" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar links={links} />
      {/* <Outlet/> */}
      <Routes>
        <Route path='medicine' element={<MedicineScreen isPharmacist />} />
        <Route path='addMedicine' element={<AddMedicine />} />
        <Route
          path='changePassword'
          element={<ChangePasswordScreen isPharmacist />}
        />
        <Route path='viewSettings' element={<ViewSettings />} />
        <Route path='salesReport' element={<SalesReport />} />
        <Route path='/chat/:contact?' element={<Chat socket={socket} />} />

      </Routes>
    </div>
  );
}

export default PharmacistApp;
