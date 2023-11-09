import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import PharmacistApp from './pharmacist/scenes/PharmacistApp';
import PatientApp from './patient/PatientApp';
import AdminApp from './admin/AdminApp';
import LoginForm from './shared/pages/LoginForm';

function App() {

  return (
    <div className="app">
      <Routes>
          <Route path='/' element={<LoginForm />} />
          {/* <Route path='/' element={<HomePage/>}/> */}
          <Route path='pharmacist/*' element={<PharmacistApp/>}/>
          <Route path='/patient/*' element={<PatientApp/>}/>
          <Route path='/admin/*' element={<AdminApp/>}/>
      </Routes>
    </div>
  );
}

export default App;