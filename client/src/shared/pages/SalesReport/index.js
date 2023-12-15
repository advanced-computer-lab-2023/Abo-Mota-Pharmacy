import { useGetSalesReportsQuery } from "../../../store";
import LoadingIndicator from "../../components/LoadingIndicator";
import SearchBar from "../../components/SearchBar";
import { useState } from "react";

const SalesReport = () => {
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const { data, isFetching, error } = useGetSalesReportsQuery();
  if (isFetching) {
    return <LoadingIndicator />;
  }
  console.log(data);
  const orders = [
    {
      date: "2023-10-01",
      totalPrice: 65.74,
      medicines: [
        { quantity: 2, price: 10.99, name: "Paracetamol" },
        { quantity: 1, price: 20.45, name: "Ibuprofen" },
        { quantity: 3, price: 11.1, name: "Cetirizine" },
      ],
    },
    {
      date: "2023-10-05",
      totalPrice: 120.0,
      medicines: [{ quantity: 4, price: 30.0, name: "Amoxicillin" }],
    },
    {
      date: "2023-11-05",
      totalPrice: 120.0,
      medicines: [{ quantity: 4, price: 30.0, name: "Amoxicillin" }],
    },
    {
      date: "2023-12-12",
      totalPrice: 204.45,
      medicines: [
        { quantity: 3, price: 50.25, name: "Atorvastatin" },
        { quantity: 2, price: 25.5, name: "Metformin" },
        { quantity: 5, price: 5.75, name: "Cetirizine" },
      ],
    },
  ];

  const dateFilteredArray = orders.filter((order) => {
    const toComp = order.date.substring(0, 7);
    console.log(dateFilter);
    if (dateFilter === "") {
      return true;
    }
    return dateFilter === toComp;
  });

  const filteredArray = dateFilteredArray.map((order) => {
    let containsMedicine = false;
    const filteredMedicines = order.medicines.map((medicine) => {
      if (medicine.name.toLowerCase().includes(search.toLowerCase())) {
        containsMedicine = true;
        return (
          <div>
            {medicine.name}-${medicine.quantity * medicine.price}
          </div>
        );
      }
      return null;
    });
    if (!containsMedicine) {
      return null;
    }
    return (
      <div>
        <div>{order.date}</div>
        <div>{filteredMedicines}</div>
      </div>
    );
  });

  return (
    <div>
      <SearchBar
        className="search-bar-medicine"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <label htmlFor="dateInput"> Choose A Month: </label>
      <input
        type="month"
        id="dateInput"
        value={dateFilter}
        onChange={(e) => setDateFilter(e.target.value)}
      />
      <h1>Sales Report</h1>
      <div>{filteredArray}</div>
    </div>
  );
};

export default SalesReport;
