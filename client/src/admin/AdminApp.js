import { Route, Routes } from "react-router";
import ManageUsers from "./pages/ManageUsers";
import ViewApplications from "./pages/ViewApplications";
import ViewPatients from './pages/ViewPatients';
import MedicineScreen from "../pharmacist/scenes/MedicineScreen";
import NavBar from "../shared/components/NavBar";
import ViewPharmacists from "./pages/ViewPharmacists";
import ChangePasswordScreen from "../shared/pages/ChangePasswordScreen";

function AdminApp() {
	const links =[
		{name: 'Change App', to: '/'},
		{name: 'Manage Users', to: '/admin/manageUsers'},
		{name: 'View Patients', to: '/admin/viewPatients'},
		{name: 'View Pharmacists', to: '/admin/viewPharmacists'},
		{name: 'View Applications', to: '/admin/applications'},
		{name: 'Medicine Inventory', to: '/admin/medicine'},
		{name:"Change Password", to:"/admin/changePassword"
		}
	]
	return (
		<div>
			<NavBar links={links} />
		<Routes>
			<Route path='/' element={<ManageUsers/>}/>
			<Route path='manageUsers' element={<ManageUsers/>}/>		
			<Route path='viewPatients' element={<ViewPatients/>}/>	
			<Route path='viewPharmacists' element={<ViewPharmacists/>}/>	
			<Route path='applications' element={<ViewApplications/>}/>
			<Route path='medicine' element={<MedicineScreen/>}/>	
			<Route path="changePassword" element={<ChangePasswordScreen isAdmin/>}/>		
		</Routes>
		
		</div>
	)
}

export default AdminApp;
