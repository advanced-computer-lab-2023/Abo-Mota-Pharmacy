
import NavBar from  './shared/components/NavBar';
import MedicineScreen from './pharmacist/scenes/MedicineScreen';
import AddMedicine from './pharmacist/scenes/AddMedicine';
import RegisterForm from './pharmacist/scenes/RegisterForm';
import LoadingIndicator from './shared/components/LoadingIndicator';
import RegisterScreen from './client/scenes/RegisterScreen';
import SideBar from './shared/components/SideBar';
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
        <NavBar links={items} />
        <RegisterScreen />
    </div>
  );
}

export default App;
