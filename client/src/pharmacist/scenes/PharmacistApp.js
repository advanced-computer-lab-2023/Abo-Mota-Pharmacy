import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import RegisterForm from './RegisterForm';
import MedicineScreen from './MedicineScreen';
import AddMedicine from './AddMedicine';
import NavBar from '../../shared/components/NavBar';
function PharmacistApp() {
  const links = [
    {name: 'Change App', to: '/'},
    {name: 'Register', to: '/pharmacist/registerPharmacist'},
    {name: 'MedicineInventory', to: '/pharmacist/medicine'},
  ]

  return (
    <div>
      <NavBar links={links}/>
      {/* <Outlet/> */}
      <Routes>
        <Route path='/registerPharmacist' element={<RegisterForm/>}/>
        <Route path='medicine' element={<MedicineScreen isPharmacist/>}/>
        <Route path='addMedicine' element={<AddMedicine/>}/>
        
      </Routes>
      
    </div>
  )
}

export default PharmacistApp
