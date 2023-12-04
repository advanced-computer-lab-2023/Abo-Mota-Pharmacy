import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import RegisterForm from "./RegisterForm";
import MedicineScreen from "./MedicineScreen";
import AddMedicine from "./AddMedicine";
import NavBar from "../../shared/components/NavBar";
import ChangePasswordScreen from "../../shared/pages/ChangePasswordScreen";
import ViewFinancials from "./ViewFinancials";
function PharmacistApp() {
  const links = [
    { name: "Change App", to: "/" },
    { name: "Register", to: "/pharmacist/registerPharmacist" },
    { name: "Medicine Inventory", to: "/pharmacist/medicine" },
    { name: "Change password", to: "/pharmacist/changePassword" },
    { name: "View Financials", to: "/pharmacist/viewFinancials" },
  ];

  return (
    <div>
      <NavBar links={links} />
      {/* <Outlet/> */}
      <Routes>
        <Route path='medicine' element={<MedicineScreen isPharmacist />} />
        <Route path='addMedicine' element={<AddMedicine />} />
        <Route
          path='changePassword'
          element={<ChangePasswordScreen isPharmacist />}
        />
        <Route path='viewFinancials' element={<ViewFinancials />} />
      </Routes>
    </div>
  );
}

export default PharmacistApp;
