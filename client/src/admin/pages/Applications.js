import ApplicationTable from "../components/ApplicationTable";



const tableHeaders1 = ['ID', 'Name', 'Date of Birth', 'Affiliation', 'Hourly Rate'];

function Applications() {
	return (
		<div>
			<ApplicationTable  headers={tableHeaders1}/>
		</div>
	)
}

export default Applications;
