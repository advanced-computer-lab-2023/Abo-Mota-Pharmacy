import React, {useState} from "react";
import DataTable from "../components/DataTable";
import { useFetchPharmacistsQuery } from "../../store";

const tableData1 = [
	{nationalId:'1234', username: 'ok', password: 'pass', name: 'omar', dob: '29-10-2002', rate: 50, affiliation: 'Hospital', educationalBackground: 'GUC'}
];

const tableHeaders1 = ['National ID', 'Username', 'Password', 'Name', 'Date of Birth', 'Rate', 'Affiliation', 'Education'];


function ViewPharmacists() {
	const {data, error, isFetching}= useFetchPharmacistsQuery();
	let content;
	if(isFetching)
		content = <div></div>
	else
		content = <DataTable rows={data} headers={tableHeaders1}/>
    return (
		<div>
			{content}
		</div>
	)
}

export default ViewPharmacists;