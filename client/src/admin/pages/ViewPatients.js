import { useFetchPatientsQuery } from "../../store";
import DataTable from "../components/DataTable";

const tableData1 = [
	{nationalId: '1', email: 'omarok@gmail.com', username: 'ok', password: 'pass', 
	name: 'omar', dob: '29-10-2002', gender: 'Male', mobile: '01000981773', 
emergencyContact: {name: 'malak', mobile: '01000981553', relation: 'sister'}, 
healthPackage: {package: 'ObjectId_1234', endDate: '12-20-2020'}, 
appointments: ['20-12-2023', '19-10-2022']},

];

let tableHeaders1 = ['Email', 'Username', 'Name', 
'Date of Birth', 'Gender', 'Mobile', 'Emergency Contact'  ];

function ViewPatients(){
	const {data, error,isFetching}= useFetchPatientsQuery();
	
	let content;
	if(isFetching)
		content = <div></div>
	else{
		tableHeaders1 = Object.keys(data)
		console.log(data)
		content = <DataTable rows={data} headers={tableHeaders1}/>
		
	}
	// console.log(data);
	return (
		<div>
			{content}
		</div>
	)
}

export default ViewPatients;
