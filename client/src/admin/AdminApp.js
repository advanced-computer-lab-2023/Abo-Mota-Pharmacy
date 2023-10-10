import { Route, Routes } from "react-router";
import ManageUsers from "./pages/ManageUsers";
import ViewApplications from "./pages/ViewApplications";
import ViewPatients from './pages/ViewPatients';
import MedicineScreen from "../pharmacist/scenes/MedicineScreen";
import NavBar from "../shared/components/NavBar";

function AdminApp() {
	const links =[
		{name: 'Change App', to: '/'},
		{name: 'Manage Users', to: '/admin/manageUsers'},
		{name: 'View Patients', to: '/admin/viewPatients'},
		{name: 'View Applications', to: '/admin/viewApplications'},
		{name: 'Medicine Inventory', to: '/admin/medicine'},
	]
	return (
		<div>
			<NavBar links={links} />
		<Routes>
			<Route path='/' element={<ManageUsers/>}/>
			<Route path='manageUsers' element={<ManageUsers/>}/>		
			<Route path='viewPatients' element={<ViewPatients/>}/>			
			<Route path='viewApplications' element={<ViewApplications/>}/>
			<Route path='medicine' element={<MedicineScreen/>}/>			
		</Routes>
		
		</div>
	)
}

export default AdminApp;
