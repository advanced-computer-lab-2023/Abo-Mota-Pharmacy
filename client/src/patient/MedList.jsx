import { useState } from "react";
import ProductCard from "../shared/components/Card/index";
import { medicines } from "../shared/assets/mockdata";
import SearchBar from "../shared/components/SearchBar";
import './style.css';


const ProductsGrid = () => {
    const [medicineArray, setMedicineArray] = useState(medicines);
    const [search, setSearch] = useState('');
    const [selectedMedicinalUse, setSelectedMedicinalUse] = useState('');
  
    const filteredArray = medicineArray.filter((medicine) => {
        return (
          (medicine.name.toLowerCase().includes(search.toLowerCase()) ||
          medicine.description.toLowerCase().includes(search.toLowerCase())) &&
          (!selectedMedicinalUse || medicine.extras.medicinalUse === selectedMedicinalUse)
        );
      });
      
    const mappedArray = filteredArray.map((medicine) => {
      return <ProductCard name={medicine.name} description={medicine.description} price={`$${medicine.price}`} extras={medicine.extras}/>
    });


const handleMedicinalUseChange = (e) => {
    const selectedMedicinalUse = e.target.value;
    setSelectedMedicinalUse(selectedMedicinalUse); //leeha lazma b3d de ^ ?
    //setSearch(''); //clear search input
    if (selectedMedicinalUse === '') {
        setMedicineArray(medicines); //show all medicines
    } else {
        const filteredByMedicinalUse = medicines.filter((medicine) => {
        return medicine.extras.medicinalUse === selectedMedicinalUse;
        });
        setMedicineArray(filteredByMedicinalUse);
        }
    };
         
    return (
      <div>
        <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />

        <div id="myBtnContainer">
            <button class="btn active" onclick="filterSelection('all')"> Show all</button>
            <button class="btn" onclick="filterSelection('cars')"> Antiviral</button>
            <button class="btn" onclick="filterSelection('animals')"> Antifungal</button>
            <button class="btn" onclick="filterSelection('fruits')"> Antipyretic</button>
            <button class="btn" onclick="filterSelection('colors')"> Antibiotic</button>
        </div>


        <div class="container">
            <div class="filterDiv cars">BMW</div>
            <div class="filterDiv colors fruits">Orange</div>
            <div class="filterDiv cars">Volvo</div>
            <div class="filterDiv colors">Red</div>
            <div class="filterDiv cars">Ford</div>
            <div class="filterDiv colors">Blue</div>
            <div class="filterDiv animals">Cat</div>
            <div class="filterDiv animals">Dog</div>
            <div class="filterDiv fruits">Melon</div>
            <div class="filterDiv fruits animals">Kiwi</div>
            <div class="filterDiv fruits">Banana</div>
            <div class="filterDiv fruits">Lemon</div>
            <div class="filterDiv animals">Cow</div>
        </div>


        {mappedArray}
        </div>
    );
  };

  export default ProductsGrid;




