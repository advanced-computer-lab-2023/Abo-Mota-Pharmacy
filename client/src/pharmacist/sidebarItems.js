import { FaHome } from 'react-icons/fa';
import { createElement } from 'react';
import { GiMedicinePills } from "react-icons/gi";
import { IoSettingsSharp } from "react-icons/io5";
import { TbReportAnalytics } from "react-icons/tb";
import { IoChatbubblesSharp } from "react-icons/io5";



const items = [
  {
    key:"0",
    icon:<FaHome/>,
    label: 'Dashboard',
    to:'/pharmacist/'
  },
  {
    key: '1',
    icon: <GiMedicinePills />,
    label: 'Medicine Inventory',
    to: '/pharmacist/medicine', // Assuming you are using react-router-dom for routing
  },
  {
    key: '2',
    icon: <IoSettingsSharp />,
    label: 'View Settings',
    to: '/pharmacist/viewSettings',
  },
  {
    key: '3',
    icon: <TbReportAnalytics />,
    label: 'Sales Report',
    to: '/pharmacist/salesReport',
  },
  {
    key: '4',
    icon: <IoChatbubblesSharp />,
    label: 'Chat',
    to: '/pharmacist/chat',
  },
  
].map(item => ({
  ...item,
  icon: createElement(item.icon.type),
  label: item.label,
}));

export default items;
