import { Route, Routes } from "react-router";
import ManageUsers from "./pages/ManageUsers";
import ViewPharmacists from "./pages/ViewPharmacists";
import ViewPatients from './pages/ViewPatients';
import MedicineScreen from "../pharmacist/scenes/MedicineScreen";
import NavBar from "../shared/components/NavBar";
import Applications from "./pages/Applications";

function AdminApp() {
	const links =[
		{name: 'Change App', to: '/'},
		{name: 'Manage Users', to: '/admin/manageUsers'},
		{name: 'View Patients', to: '/admin/viewPatients'},
		{name: 'View Pharmacists', to: '/admin/viewPharmacists'},
		{name: 'View Applications', to: '/admin/applications'},
		{name: 'Medicine Inventory', to: '/admin/medicine'},
	]
	return (
		<div>
			<NavBar links={links} />
		<Routes>
			<Route path='/' element={<ManageUsers/>}/>
			<Route path='manageUsers' element={<ManageUsers/>}/>		
			<Route path='viewPatients' element={<ViewPatients/>}/>	
			<Route path='applications' element={<Applications/>}/>			
			<Route path='viewPharmacists' element={<ViewPharmacists/>}/>
			<Route path='medicine' element={<MedicineScreen/>}/>			
		</Routes>
		
		</div>
	)
}

export default AdminApp;
