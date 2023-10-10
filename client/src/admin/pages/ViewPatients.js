import DataTable from "../components/DataTable";

const tableData1 = [
	{nationalId: '1', email: 'omarok@gmail.com', username: 'ok', password: 'pass', 
	name: 'omar', dob: '29-10-2002', gender: 'Male', mobile: '01000981773', 
emergencyContact: {name: 'malak', mobile: '01000981553', relation: 'sister'}, 
healthPackage: {package: 'ObjectId_1234', endDate: '12-20-2020'}, 
appointments: ['20-12-2023', '19-10-2022']},

];

const tableHeaders1 = ['National ID', 'Email', 'Username', 'Password', 'Name', 
'Date of Birth', 'Gender', 'Mobile', 'Emergency Contact', 'Health Package', 
'Appointments'];

function ViewPatients() {
	return (
		<div>
			<DataTable rows={tableData1} headers={tableHeaders1}/>
		</div>
	)
}

export default ViewPatients;
