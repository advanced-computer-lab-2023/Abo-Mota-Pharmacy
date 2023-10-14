import { useFetchPatientsQuery } from "../../store";
import DataTable from "../components/DataTable";

const tableData1 = [
	{nationalId: '1', email: 'omarok@gmail.com', username: 'ok', password: 'pass', 
	name: 'omar', dob: '29-10-2002', gender: 'Male', mobile: '01000981773', 
emergencyContact: {name: 'malak', mobile: '01000981553', relation: 'sister'}, 
healthPackage: {package: 'ObjectId_1234', endDate: '12-20-2020'}, 
appointments: ['20-12-2023', '19-10-2022']},

];




function ViewPatients(){
	const {data, error,isFetching}= useFetchPatientsQuery();
	let tableHeaders = {name:'Name',username:'Username',email:'Email', formattedDob:'Date of birth', gender: 'Gender', mobile:'Mobile',emergencyContact:'Emergency Contact' }; 
	let content;
	if(isFetching)
		content = <div></div>
	else
	{
		content = <DataTable rows={data} headers={tableHeaders}/>
	}
	
	return (
		<div>
			{content}
		</div>
	)
}

export default ViewPatients;
