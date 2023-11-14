import React, {useState} from "react";
import DataTable from "../components/DataTable";
import { useFetchPharmacistsQuery } from "../../store";



function ViewPharmacists() {
	const {data, error, isFetching}= useFetchPharmacistsQuery();
	let content;
	const tableHeaders1 ={name:'Name', email:'Email', username:'Username', formattedDob:'Date of Birth', 
	rate:'Hourly Rate', affiliation:'Affiliation', educationalBackground:'Educational Background',
	workingLicense : 'Medical License' , pharmacyDegree: 'Pharmacy Degree', nationalId: "National Id" }
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