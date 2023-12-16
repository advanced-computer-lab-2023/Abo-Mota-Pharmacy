import { useLocation } from "react-router";
const AlternativesScreen = () => {
  const location = useLocation();
  console.log("kimo", location.state.filteredArray);
  if (location.state.filteredArray.length === 0)
    return <div>No Alternatives</div>;
  const alternatives = location.state.filteredArray.map((med) => {
    return (
      <div>
        <h1>{med.name}</h1>
        <h1>{med.price}</h1>
        <h1>{med.medicinalUse}</h1>
      </div>
    );
  });
  return <div>{alternatives}</div>;
};

export default AlternativesScreen;
