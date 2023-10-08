import React, {useState} from "react";
import CollapsibleTable from "../components/CollapsibleTable";

const tableData1 = [
	{id: '1', name: 'omar', dateOfBirth: '29-10-2002', affiliation: 'Hospital', hourlyRate: '50', 
	education: 'GUC', degree: 'idc', license: 'idc'}
];
const tableData2 = [];

const tableHeaders1 = ['ID', 'Name', 'Date of Birth', 'Affiliation', 'Hourly Rate'];
const tableHeaders2 = ['Custom Header 1', 'Custom Header 2', 'Custom Header 3'];

function ViewPharmacists() {
	return (
		<div>
			<CollapsibleTable rows={tableData1} headers={tableHeaders1}/>
		</div>
	)
}

export default ViewPharmacists;
