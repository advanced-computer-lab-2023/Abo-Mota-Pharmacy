import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import PharmacistApp from "./pharmacist/scenes/PharmacistApp";
import PatientApp from "./patient/PatientApp";
import AdminApp from "./admin/AdminApp";
import LoginForm from "./shared/pages/LoginForm";
import ProtectedRoute from "./ProtectedRoute";
import RegisterScreen from "./patient/scenes/RegisterScreen";
import RegisterForm from "./pharmacist/scenes/RegisterForm";
import ConnectAccountForm from "./patient/scenes/ConnectAccountsForm";
import io from "socket.io-client";
import GetStarted from "./shared/pages/GetStarted/GetStarted";
import LandingPage from "./shared/pages/LandingPage/LandingPage";


const socket = io.connect("http://localhost:8000");

function App() {
  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<GetStarted task='Sign In'/>} />
        <Route path='/registerPatient' element={<GetStarted task='Sign Up' />} />
        <Route path='/registerPharmacist' element={<GetStarted task='Join the team'/>} />

        <Route path='/home' element={<HomePage />} />
        <Route element={<ProtectedRoute roles={["pharmacist"]} />}>
          <Route
            path='pharmacist/*'
            element={<PharmacistApp socket={socket} />}
          />
        </Route>

        <Route element={<ProtectedRoute roles={["patient"]} />}>
          <Route path='/patient/*' element={<PatientApp socket={socket} />} />
          
        </Route>

        <Route element={<ProtectedRoute roles={["admin"]} />}>
          <Route path='/admin/*' element={<AdminApp />} />
        </Route>
        {/* <Route path= '/login' element={<LoginForm/>}/> */}
      </Routes>
    </div>
  );
}

export default App;
