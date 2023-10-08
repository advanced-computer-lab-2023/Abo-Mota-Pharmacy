import React from 'react'
import { Link } from 'react-router-dom'
function HomePage() {
  return (
    <div>
      <Link to='pharmacist'>
        <button>Register as Pharmacist</button>
      </Link>
      <Link to='patient'>
        <button>Register as Patient</button>
      </Link>
      
    </div>
  )
}

export default HomePage
