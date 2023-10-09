import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ProductsGrid from './MedList'
import RegisterScreen from '../client/scenes/RegisterScreen'
import NavBar from '../shared/components/NavBar'
import MedicineScreen from '../pharmacist/scenes/MedicineScreen'
function PatientApp() {
  const links = [
    {name: 'Change App', to: '/'},
    {name: 'Register', to: '/patient/'},
    {name: 'MedicineInventory', to: '/patient/medicine'},
    {name: 'MedicineInventory2', to: '/patient/medicine2'}
  ]
  return (
    <div>
      <NavBar links={links}/>
      <Routes>
        <Route path='/' element={<RegisterScreen/>}/>
        <Route path='medicine' element={<ProductsGrid/>}/>
        <Route path='medicine2' element={<MedicineScreen />} />
        {/* </Route> */}
        
      </Routes>
    </div>
  )
}

export default PatientApp