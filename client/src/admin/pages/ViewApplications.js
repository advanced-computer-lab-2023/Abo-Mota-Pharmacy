import React, {useState} from "react";
import CollapsibleTable from "../components/CollapsibleTable";
import { useFetchApplicationsQuery } from "../../store";


const tableData2 = [];

const tableHeaders1 = [ 'Name', 'Email','Username','Date of Birth', 'Affiliation', 'Hourly Rate'];


function ViewApplications() {
	const {data, error, isFetching}= useFetchApplicationsQuery();
	let content ;
	if(isFetching)
		content = <div></div>
	else
		content = <CollapsibleTable data={data} headers={tableHeaders1}/>
	return (
		<div>
			{content}
		</div>
	)
}

export default ViewApplications;
