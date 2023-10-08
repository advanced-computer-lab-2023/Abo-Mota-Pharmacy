import React, {useState} from "react";
import CollapsibleTable from "../components/CollapsibleTable";

const tableData1 = [
	{id: '1', name: 'omar', dateOfBirth: '29-10-2002', affiliation: 'Hospital', hourlyRate: '50'}
];
  
const tableData2 = [];
  
const tableHeaders1 = ['ID', 'Name', 'Date of Birth', ''];
const tableHeaders2 = ['Custom Header 1', 'Custom Header 2', 'Custom Header 3'];

function ViewPatients() {
	return (
		<div>
			<CollapsibleTable rows={tableData1} headers={tableHeaders1}/>
		</div>
	)
}

export default ViewPatients;
