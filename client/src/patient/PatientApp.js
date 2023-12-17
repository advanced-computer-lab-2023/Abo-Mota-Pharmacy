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
import ViewSettings from "./scenes/ViewSettings";
import ConnectAccountForm from "./scenes/ConnectAccountsForm";
import PrescriptionsScreen from "./scenes/PrescriptionsScreen";
import Chat from "../shared/pages/Chat";
import Outline from "../shared/Outline";
import sideBarItems from "./sideBarItems";
import PatientHome from "./PatientHome";


function PatientApp({ socket }) {

  // console.log(data);

  const outlet = <Routes>
    <Route path="medicine" element={<MedList />} />
    <Route path="medicine2" element={<MedicineScreen />} />
    <Route path="checkout" element={<Checkout socket={socket} />} />
    <Route path="/order" element={<OrderCard />} />
    <Route path="/myOrders" element={<MyOrders />} />
    <Route path="/medicine/alternativesScreen" element={<AlternativesScreen />} />
    <Route path="/connectAccountForm" element={<ConnectAccountForm />} />
    <Route path="/changePassword" element={<ChangePasswordScreen isPatient />} />
    <Route path='/viewSettings' element={<ViewSettings />} />
    <Route path='/prescription' element={<PrescriptionsScreen />} />
    <Route path='/chat/:contact?' element={<Chat socket={socket} />} />
    <Route path="" element={<PatientHome/>}/>
    {/* </Route> */}
  </Routes>
  return (
    
    
    <Outline style={{ backgroundColor: "blue" }} outlet={outlet} items={sideBarItems} socket={socket} isPatient />
  );
}

export default PatientApp;
