import Accordion from "../../../shared/components/Accordion";
import { medicines } from "../../../shared/assets/mockdata";
import { useState } from "react";
import SearchBar from "../../../shared/components/SearchBar";

const MedicineScreen = () => {
  const [medicineArray, setMedicineArray] = useState(medicines);
  const [search, setSearch] = useState('');

  const filteredArray = medicineArray.filter((medicine) => {
    return medicine.name.toLowerCase().includes(search.toLowerCase());
  });
  const mappedArray = filteredArray.map((medicine) => {
    return <Accordion label={medicine.name} subLabel={medicine.description} price={`$${medicine.price}`} expanded={medicine.extras}/>
  });
  return (
    <div>
      <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />
      {mappedArray}
    </div>
  );
};

export default MedicineScreen;