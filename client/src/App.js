
import NavBar from  './shared/components/NavBar';
import MedicineScreen from './pharmacist/scenes/MedicineScreen';
import AddMedicine from './pharmacist/scenes/AddMedicine';
import RegisterScreen from './pharmacist/scenes/RegisterScreen';
function App() {
  return (
    <div className="App">
      <NavBar />
      <MedicineScreen />
    </div>
  );
}

export default App;
