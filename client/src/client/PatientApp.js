import React from 'react'
import { Routes, Route } from 'react-router-dom'
import RegisterScreen from './scenes/RegisterScreen'
function PatientApp() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<RegisterScreen/>}/>
        {/* </Route> */}
        
      </Routes>
    </div>
  )
}

export default PatientApp
