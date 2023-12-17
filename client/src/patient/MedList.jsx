import { useState } from "react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchBar from "../shared/components/SearchBar";
import "./style.css";
import Filter from "./Filter";
import { useGetMedicinesQuery } from "../store";
import LoadingIndicator from "../shared/components/LoadingIndicator";

const MedList = () => {
  const [search, setSearch] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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

  const handleCartIcon = () => {
    setIsDrawerOpen(true);
  };
  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };


  return (
    <div className="mr-20 ml-20">
      <div className="flex flex-row justify-end gap-6">
      <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />
        <button
          className="bg-white text-black mb-2 rounded-3xl"
          onClick={handleCartIcon}
        >
          <ShoppingCartOutlinedIcon />
          Cart
        </button>
      </div>

      <Filter medicines={filteredArray} isDrawerOpen={isDrawerOpen} closeDrawer={closeDrawer}/>
    </div>
  );
};

export default MedList;
