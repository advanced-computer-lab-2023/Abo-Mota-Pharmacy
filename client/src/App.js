
import NavBar from  './shared/components/NavBar';
import MedicineScreen from './pharmacist/scenes/MedicineScreen';
import AddMedicine from './pharmacist/scenes/AddMedicine';
import RegisterForm from './pharmacist/scenes/RegisterForm';
import LoadingIndicator from './shared/components/LoadingIndicator';
import RegisterScreen from './client/scenes/RegisterScreen';
import SideBar from './shared/components/SideBar';
import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import PharmacistApp from './pharmacist/scenes/PharmacistApp';
import PatientApp from './client/PatientApp';

function App() {
  const items = [
    {
      name: "Profile",
      to: "profile"
    },
    {
      name: "Patients",
      to: "patients",
    },
    {
      name: "Appointments",
      to: "appointments",
    },
    
  ];
  return (
    <div className="app">
      <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='pharmacist/*' element={<PharmacistApp/>}/>
          <Route path='patient/*' element={<PatientApp/>}/>
          {/* <Route path='/admin/*' element={<RegisterScreen/>}/> */}
      </Routes>
        {/* <NavBar links={items} />
        <RegisterScreen /> */}
    </div>
  );
}

export default App;
