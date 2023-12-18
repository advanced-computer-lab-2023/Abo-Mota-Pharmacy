import { useState } from "react";
import SearchBar from "../../shared/components/SearchBar";
import "./style.css";
import Filter from "./Filter";
import { useGetAllMedicinesQuery } from "../../store";
import LoadingIndicator from "../../shared/components/LoadingIndicator";
import { Link, Link as RouterLink } from "react-router-dom";
import { Breadcrumbs, Typography } from "@mui/joy";

const MedList = () => {
  const [search, setSearch] = useState("");

  const { data, error, isFetching } = useGetAllMedicinesQuery();

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
    <div className="mr-20 ml-20 mb-20">
      <Breadcrumbs aria-label="breadcrumbs" className="mt-5">
          <Link component={RouterLink} color="neutral" to="../">
            Home
          </Link>
          <Typography>Inventory</Typography>
      </Breadcrumbs>
      <div class="flex justify-end p-2 gap-8">
        <div class="flex justify-end p-4 space-x-4">
          <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />
          <Link
            to="/pharmacist/addMedicine"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add Medicine
          </Link>
        </div>
      </div>
      <Filter medicines={filteredArray} />
    </div>
  );
};

export default MedList;
