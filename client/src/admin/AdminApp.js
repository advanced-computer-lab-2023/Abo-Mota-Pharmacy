import { Route, Routes } from "react-router";
import ManageUsers from "./pages/ManageUsers";
import ViewApplications from "./pages/ViewApplications";
import ViewPatients from "./pages/ViewPatients";
import MedicineScreen from "../pharmacist/scenes/MedicineScreen";
import NavBar from "../shared/components/NavBar";
import ViewPharmacists from "./pages/ViewPharmacists";
import ChangePasswordScreen from "../shared/pages/ChangePasswordScreen";
import SalesReport from "../shared/pages/SalesReport";
import Outline from "../shared/Outline";
import sideBarItems from "./sidebarItems";
import MedList from "../patient/MedList"
function AdminApp() {
 
  const outlet = <Routes>
                    <Route path='/' element={<ManageUsers />} />
                    <Route path='manageUsers' element={<ManageUsers />} />
                    <Route path='viewPatients' element={<ViewPatients />} />
                    <Route path='viewPharmacists' element={<ViewPharmacists />} />
                    <Route path='applications' element={<ViewApplications />} />
                    <Route path='medicine' element={<MedicineScreen />} />
                    <Route
                      path='changePassword'
                      element={<ChangePasswordScreen isAdmin />}
                    />
                    <Route path='salesReport' element={<SalesReport />} />
                </Routes>
  const navBarItems = [
    {
      name: "Change Password",
      to: "/admin/changePassword",
    }
  ]
  return (
    <div>
      <Outline style={{backgroundColor: "blue"}} outlet={outlet} items={sideBarItems} navBarItems={navBarItems}/>;
    </div>
  );
}

export default AdminApp;
