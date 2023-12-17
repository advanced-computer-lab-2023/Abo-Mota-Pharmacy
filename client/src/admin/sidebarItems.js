
import { FaUsers } from "react-icons/fa";
import { createElement } from 'react';
import { GiMedicinePills } from "react-icons/gi";
import { TbReportAnalytics } from "react-icons/tb";
import { LuUsers } from "react-icons/lu";
import { MdOutlineFileCopy } from "react-icons/md";
import { MdPassword } from "react-icons/md";

const items = [
  {
    key: '0',
    icon: <FaUsers />,
    label: 'Manage Users',
    to: '/admin/manageUsers', // Assuming you are using react-router-dom for routing
  },
  {
    key: '1',
    icon: <LuUsers />,
    label: 'View Patients',
    to: '/admin/viewPatients',
  },
  {
    key: '2',
    icon: <LuUsers />,
    label: 'View Pharmacists',
    to: '/admin/viewPharmacists',
  },
  {
    key: '3',
    icon: <MdOutlineFileCopy />,
    label: 'View Applications',
    to: '/admin/applications',
  },
  {
    key: '4',
    icon: <GiMedicinePills />,
    label: 'Medicine Inventory',
    to: '/admin/medicine',
  },
  {
    key: '5',
    icon: <TbReportAnalytics />,
    label: 'Sales Report',
    to: '/admin/salesReport',
  },
  
].map(item => ({
  ...item,
  icon: createElement(item.icon.type),
  label: item.label,
}));

export default items;

