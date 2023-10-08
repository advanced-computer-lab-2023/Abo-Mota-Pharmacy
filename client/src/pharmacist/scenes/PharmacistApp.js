import React from 'react'
import { Routes, Route } from 'react-router-dom'
import RegisterForm from './RegisterForm'
import MedicineScreen from './MedicineScreen'
function PharmacistApp() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<RegisterForm/>}/>
        <Route path='medicine' element={<MedicineScreen/>}/>
        {/* </Route> */}
        
      </Routes>
      
    </div>
  )
}

export default PharmacistApp
