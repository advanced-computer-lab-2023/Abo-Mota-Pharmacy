
import NavBar from  './shared/components/NavBar';
import MedicineScreen from './pharmacist/scenes/MedicineScreen';
import AddMedicine from './pharmacist/scenes/AddMedicine';
import RegisterForm from './pharmacist/scenes/RegisterForm';
import LoadingIndicator from './shared/components/LoadingIndicator';
import RegisterScreen from './client/scenes/RegisterScreen';
function App() {
  return (
    <div className="App">
      <NavBar />
      <RegisterScreen />
    </div>
  );
}

export default App;
