
import NavBar from  './shared/components/NavBar';
import MedicineScreen from './pharmacist/scenes/MedicineScreen';
import AddMedicine from './pharmacist/scenes/AddMedicine';
import RegisterForm from './pharmacist/scenes/RegisterForm';
import LoadingIndicator from './shared/components/LoadingIndicator';
import RegisterScreen from './client/scenes/RegisterScreen';
import SideBar from './shared/components/SideBar';
import ViewPharmacists from './admin/pages/ViewPharmacists';
function App() {
  const items = [
    {
      name: "ViewPatients",
      to: "viewPatients"
    },
    {
      name: "ManageUsers",
      to: "manageUsers",
    },
    {
      name: "ViewPharmacists",
      to: "viewPharmacists"
    },
    
  ];
  return (
    <div className="app">
        <NavBar links={items} />
        <ViewPharmacists />
    </div>
  );
}

export default App;
