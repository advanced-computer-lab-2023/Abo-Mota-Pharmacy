import React from 'react'
import { Link } from 'react-router-dom'
function HomePage() {
  return (
    <div>
      <Link to='pharmacist'>
        <button>View Pharmacist</button>
      </Link>
      <Link to='patient'>
        <button>View Patient</button>
      </Link>
      <Link to='admin'>
        <button>View admin</button>
      </Link>
      
    </div>
  )
}

export default HomePage
