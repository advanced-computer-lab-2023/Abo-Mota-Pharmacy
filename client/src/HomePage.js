import React from 'react'
import { Link } from 'react-router-dom'
function HomePage() {
  return (
    <div style={{display: "flex", justifyContent: "space-between", width: "80%"}}>
      <Link to='../pharmacist/registerPharmacist'>
        <button>View Pharmacist</button>
      </Link>
      <Link to='../patient/registerPatient'>
        <button>View Patient</button>
      </Link>
      
      
    </div>
  )
}

export default HomePage
