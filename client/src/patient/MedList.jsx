import { useState } from "react";
import { medicines } from "../shared/assets/mockdata";
import SearchBar from "../shared/components/SearchBar";
import "./style.css";
import Filter from "./Filter";
import { useGetMedicinesQuery } from "../store";
import LoadingIndicator from "../shared/components/LoadingIndicator";

const MedList = ({socket}) => {
  // const [medicineArray, setMedicineArray] = useState(medicines);
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

  // const mappedArray = filteredArray.map((medicine) => {
  //   return <ProductCard name={medicine.name} description={medicine.description} price={medicine.price} extras={medicine.extras}/>
  // });

  return (
    <div>
      <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />
      {/* {mappedArray} */}
      <Filter medicines={filteredArray} socket={socket} />
    </div>
  );
};

export default MedList;
