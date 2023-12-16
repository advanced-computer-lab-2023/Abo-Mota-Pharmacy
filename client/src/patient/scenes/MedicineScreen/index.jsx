import Accordion from "../../../shared/components/Accordion";
import { medicines } from "../../../shared/assets/mockdata";
import { useEffect, useState } from "react";
import SearchBar from "../../../shared/components/SearchBar";
import FilterButton from "../../../shared/components/FilterButton";
import { medicinalUses } from "../../../shared/assets/mockdata";
import Button from "../../../shared/components/Button";
import { AiOutlinePlus } from "react-icons/ai";
import LoadingIndicator from "../../../shared/components/LoadingIndicator";
import "./styles.css";
import Header from "../../../shared/components/Header";
import { Link } from "react-router-dom";
import { useGetMedicinesQuery } from "../../../store";
const MedicineScreen = ({ isPharmacist = false }) => {
  // const [medicineArray,setMedicineArray] = useState([]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  // const { data, error , isFetching } = useGetMedicinesQuery();

  console.log("filter", filter);

  const { data, error, isFetching } = useGetMedicinesQuery();

  // const [getMedicinesError, setGetMedicinesError] = useState('');

  // useEffect(() => {
  //   if(data && !isFetching){
  //     setMedicineArray(data);
  //     console.log(data);
  //   }else if(error && !isFetching){
  //     setGetMedicinesError(error.message);
  //     console.log(error);
  //   }
  // },[data,isFetching,error]);
  let medicineArray = [];
  if (isFetching) {
    return <LoadingIndicator />;
  }
  if (data && !isFetching) {
    medicineArray = data;
    // console.log(data);
  }
  const filteredArray = medicineArray.filter((medicine) => {
    return (
      medicine.name.toLowerCase().includes(search.toLowerCase()) &&
      medicine.medicinalUse.includes(filter)
    );
  });

  const mappedArray = filteredArray.map((medicine, index) => {
    return (
      <Accordion
        isPharmacist={isPharmacist}
        key={index}
        label={medicine.name}
        subLabel={medicine.description}
        price={`$${medicine.price}`}
        quantity={medicine.quantity}
        medicinalUse={medicine.medicinalUse}
        sales={medicine.sales}
      />
    );
  });

  return (
    <div className="medicine-screen-pharmacist">
      <Header header="Medicine Inventory" subheader="Here you can check your Inventory" />
      <div className="search-filter-div">
        <SearchBar
          className="search-bar-medicine"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <FilterButton options={medicinalUses} filter={filter} setFilter={setFilter} />

        {isPharmacist ? (
          <div className="add-medicine-container">
            <Link to="/pharmacist/addMedicine" className="add-medicine-button-container">
              <Button type="button">
                <AiOutlinePlus color="#fff" size={20} />
                Add Medicine
              </Button>
            </Link>
          </div>
        ) : null}
      </div>
      {isFetching && (
        <div className="loading-error-container">
          <LoadingIndicator size={40} />
        </div>
      )}
      {error && <div className="loading-error-container">Error...</div>}
      {!isFetching && !error && mappedArray}
    </div>
  );
};

export default MedicineScreen;
