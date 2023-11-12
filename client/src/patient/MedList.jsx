import { useState } from "react";
import { medicines } from "../shared/assets/mockdata";
import SearchBar from "../shared/components/SearchBar";
import './style.css';
import Filter from './Filter';

const ProductsGrid = () => {
    const [medicineArray, setMedicineArray] = useState(medicines);
    const [search, setSearch] = useState('');

  
    const filteredArray = medicineArray.filter((medicine) => {
        return (
          (medicine.name.toLowerCase().includes(search.toLowerCase()) ||
          medicine.description.toLowerCase().includes(search.toLowerCase()))
        );
      });
      
    // const mappedArray = filteredArray.map((medicine) => {
    //   return <ProductCard name={medicine.name} description={medicine.description} price={medicine.price} extras={medicine.extras}/>
    // });

         
    return (
      <div>
        <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />
        {/* {mappedArray} */}
        <Filter medicines={filteredArray}/>
        </div>
    );
  };

  export default ProductsGrid;




