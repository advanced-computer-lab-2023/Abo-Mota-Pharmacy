import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ProductsGrid from './MedList'
import RegisterScreen from './scenes/RegisterScreen'
import NavBar from '../shared/components/NavBar'
import { useGetMedicinesQuery } from '../store'
import MedicineScreen from './scenes/MedicineScreen';
import Checkout from './Checkout';
import OrderCard from './Order'

function PatientApp() {
  const links = [
    {name: 'Change App', to: '/'},
    {name: 'Register', to: '/patient/registerPatient'},
    {name: 'MedicineInventory', to: '/patient/medicine'},
    {name: 'MedicineInventory2', to: '/patient/medicine2'},
    //
    {name: 'Shop Medicines', to: 'patient'}
  ]
  // console.log(data);
  return (
    <div>
      <NavBar links={links}/>
      <Routes>
        <Route path='/registerPatient' element={<RegisterScreen/>}/>
        <Route path='medicine' element={<ProductsGrid/>}/>
        <Route path='medicine2' element={<MedicineScreen />} />
        <Route path='patient' element={<ProductsGrid/>}/>
        <Route path='checkout' element={<Checkout/>}/>
        <Route path='/order' element={<OrderCard/>}/>
        
        {/* </Route> */}
        
      </Routes>
    </div>
  )
}

export default PatientApp