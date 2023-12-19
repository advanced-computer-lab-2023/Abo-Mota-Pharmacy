import { FaHome } from 'react-icons/fa';
import { createElement } from 'react';
import { GiMedicinePills, GiMedicines } from "react-icons/gi";
import { IoSettingsSharp } from "react-icons/io5";
import { HiShoppingBag } from "react-icons/hi";
import { IoChatbubblesSharp } from "react-icons/io5";
import { FaHandHoldingMedical } from "react-icons/fa";

const PHARMA_SERVICE_ID = process.env.REACT_APP_PHARMA_SERVICE_ID;

const links = [
    { name: "View My Orders", to: "/patient/myOrders" },
    { name: "View Account", to: "/patient/viewSettings" },
    { name: "Prescription", to: "/patient/prescription" },
  ];

const items = [
  {
    key:"0",
    icon:<FaHome/>,
    label: 'Dashboard',
    to:'/patient/'
  },
  {
    key: '1',
    icon: <GiMedicinePills />,
    label: 'Shop Medicines',
    to: '/patient/medicine', // Assuming you are using react-router-dom for routing
  },
  {
    key: '2',
    icon: <HiShoppingBag />,
    label: 'View My Orders',
    to: '/patient/myOrders',
  },
  {
    key: '3',
    icon: <IoSettingsSharp />,
    label: 'View Settings',
    to: '/patient/viewSettings',
  },
  {
    key: '4',
    icon: <GiMedicines />,
    label: 'Prescription',
    to: '/patient/prescription',
  },
  {
    key: '5',
    icon: <FaHandHoldingMedical />,
    label: 'PharmaService',
    to: `/patient/chat/${PHARMA_SERVICE_ID}`,
  },
  
].map(item => ({
  ...item,
  icon: createElement(item.icon.type),
  label: item.label,
}));

export default items;
