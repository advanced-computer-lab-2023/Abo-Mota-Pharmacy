import ApplicationTable from "../components/ApplicationTable";

const tableData1 = [
	{id: '1', name: 'omar', dob: '29-10-2002', affiliation: 'Hospital', rate: '50', 
	educationalBackground: 'GUC', pharmacyDegree: 'idc', workingLicense: 'idc'}
];

const tableHeaders1 = ['ID', 'Name', 'Date of Birth', 'Affiliation', 'Hourly Rate'];

function Applications() {
	return (
		<div>
			<ApplicationTable rows={tableData1} headers={tableHeaders1}/>
		</div>
	)
}

export default Applications;
