import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import RegisterForm from "./RegisterForm";
import MedicineScreen from "./MedicineScreen";
import AddMedicine from "./AddMedicine";
import NavBar from "../../shared/components/NavBar";
import ChangePasswordScreen from "../../shared/pages/ChangePasswordScreen";
import ViewFinancials from "./ViewFinancials";
import SalesReport from "../../shared/pages/SalesReport";
import { useGetPharmacistQuery, useFetchNotificationQuery } from "../../store";

function PharmacistApp({socket}) {
  const links = [
    { name: "Change App", to: "/" },
    { name: "Register", to: "/pharmacist/registerPharmacist" },
    { name: "Medicine Inventory", to: "/pharmacist/medicine" },
    { name: "Change password", to: "/pharmacist/changePassword" },
    { name: "View Financials", to: "/pharmacist/viewFinancials" },
    { name: "Sales Report", to: "/pharmacist/salesReport" },
  ];

  const { data, isFetching } = useGetPharmacistQuery();
  
  const { data: notifs, isFetching: isFetchingNotifs } = useFetchNotificationQuery();

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    !isFetching && socket.emit("user_connected", data._id)
  }, [isFetching]);

  useEffect(() => {
    if (!isFetchingNotifs) {
      const notif = notifs.notifications
        .filter((notification) => notification != null)
        .map((notification, index) => notification.content);
      setNotifications(notif);
    }
  }, [isFetchingNotifs]);

  useEffect(() => {
    const handleReceiveNotification = ({ content }) => setNotifications((prev) => [...prev, content]);

    // Attach the event listener
    socket.on("receive_notification_stock", handleReceiveNotification);
    
  }, [socket]);

  let content = '';
  if(!isFetchingNotifs){
  content = notifications.map((notif, index) => {
    return <div key={index}>
      {notif}
    </div>
  })
}

  return (
    <div>
      <NavBar links={links} socket={socket} notifications={notifications}/>
      {/* <Outlet/> */}
      <div>
        {content}
      </div>
      <Routes>
        <Route path='medicine' element={<MedicineScreen isPharmacist />} />
        <Route path='addMedicine' element={<AddMedicine />} />
        <Route
          path='changePassword'
          element={<ChangePasswordScreen isPharmacist />}
        />
        <Route path='viewFinancials' element={<ViewFinancials />} />
        <Route path='salesReport' element={<SalesReport />} />
      </Routes>
    </div>
  );
}

export default PharmacistApp;
