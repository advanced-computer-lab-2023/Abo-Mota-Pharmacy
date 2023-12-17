import { useState } from "react";
import SearchBar from "../shared/components/SearchBar";
import "./style.css";
import Filter from "./Filter";
import { useGetMedicinesQuery } from "../store";
import LoadingIndicator from "../shared/components/LoadingIndicator";

const MedList = () => {
  const [search, setSearch] = useState("");

  const { data, error, isFetching } = useGetMedicinesQuery();

  let medicineArray = [];
  if (isFetching) {
    return (
      <div className="loading-error-container">
        <LoadingIndicator size={40} />
      </div>
    );
  }
  if (error) {
    return <div className="loading-error-container">Error...</div>;
  }
  if (data && !isFetching) {
    medicineArray = data;
    // console.log(data);
  }

  const filteredArray = medicineArray.filter((medicine) => {
    return (
      medicine.name.toLowerCase().includes(search.toLowerCase()) ||
      medicine.description.toLowerCase().includes(search.toLowerCase())
    );
  });


  return (
    <div className="mr-20 ml-20">
      <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />
      {/* {mappedArray} */}
      <Filter medicines={filteredArray} />
    </div>
  );
};

export default MedList;
