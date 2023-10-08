import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ProductsGrid from './MedList'
import RegisterScreen from '../client/scenes/RegisterScreen'
function PatientApp() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<ProductsGrid/>}/>
        {/* </Route> */}
        
      </Routes>
    </div>
  )
}

export default PatientApp