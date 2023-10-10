import React, {useState} from "react";
import DataTable from "../components/DataTable";

const tableData1 = [
	{nationalId:'1234', username: 'ok', password: 'pass', name: 'omar', dob: '29-10-2002', rate: 50, affiliation: 'Hospital', educationalBackground: 'GUC'}
];

const tableHeaders1 = ['National ID', 'Username', 'Password', 'Name', 'Date of Birth', 'Rate', 'Affiliation', 'Education'];


function ViewPharmacists() {
    return (
		<div>
			<DataTable rows={tableData1} headers={tableHeaders1}/>
		</div>
	)
}

export default ViewPharmacists;