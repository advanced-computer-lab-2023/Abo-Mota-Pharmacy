import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import PharmacistApp from './pharmacist/scenes/PharmacistApp';
import PatientApp from './patient/PatientApp';
import AdminApp from './admin/AdminApp';
import Contract from './shared/components/Contract';

function App() {

  return (
    <div className="app">
      <Routes>
          <Route path='/' element={<Contract contractTitle='Doctor Contract' name={'Karim Gamaleldin'} doctor />}/>
          {/* <Route path='/' element={<HomePage/>}/> */}
          <Route path='pharmacist/*' element={<PharmacistApp/>}/>
          <Route path='/patient/*' element={<PatientApp/>}/>
          <Route path='/admin/*' element={<AdminApp/>}/>
      </Routes>
    </div>
  );
}

export default App;