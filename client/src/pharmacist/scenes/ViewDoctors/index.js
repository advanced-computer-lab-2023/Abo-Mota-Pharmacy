import { useState } from "react";
import { useGetDoctorsQuery } from "../../../store";
import DoctorCard from "../../DoctorCard";
import SearchBar from "../../SearchBar";
import filter from "../../../shared/functions/filter";
import filterSearch from "../../../shared/functions/filterSearch";

import {
  Autocomplete,
  CircularProgress,
  FormControl,
  FormLabel,
  Box,
  Link,
  Breadcrumbs,
  Typography,
} from "@mui/joy";
import { Link as RouterLink } from "react-router-dom";

function ViewDoctors() {
  const [doctorSearchTerm, setDoctorSearchTerm] = useState("");
  const [config, setConfig] = useState({});

  const { data, isFetching, error } = useGetDoctorsQuery();

  let content;
  let specialties = [];
  let discount;

  if (isFetching) {
    content = undefined;
  } else if (error) {
    content = <div> Error ... </div>;
  } else {
    let filteredData = filter(data, config);

    filteredData = filterSearch(filteredData, doctorSearchTerm, ["name"]);
    // filteredData = filterSearch(filteredData, specialtySearchTerm, ["specialty"]);
    // discount = 20;

    content = (
      <>
        {filteredData.map((doctor, index) => {
          // const handleRedirect = () => navigate('../doctorInfo', { state: doctor });
          return <DoctorCard index={index} {...doctor} doctorId={doctor._id} discount={discount} />;
        })}
      </>
    );

    specialties = [...new Set(data.map((doctor) => doctor.specialty))];
  }

  return (
    <div className="mt-5 px-14">
      <Breadcrumbs aria-label="breadcrumbs" className="mb-2">
        <Link component={RouterLink} color="neutral" to="../">
          Home
        </Link>
        <Typography>Doctors</Typography>
      </Breadcrumbs>

      <Box className="header flex mb-8 pr-10 space-x-5">
        <FormControl id="multiple-limit-tags">
          <FormLabel>Doctor name</FormLabel>
          <SearchBar
            placeholder="Search for doctors ..."
            onChange={(value) => setDoctorSearchTerm(value)}
          />
        </FormControl>

        <FormControl id="multiple-limit-tags">
          <FormLabel>Specialties</FormLabel>
          <Autocomplete
            multiple
            id="tags-default"
            placeholder="Specialties"
            loading={isFetching}
            options={specialties}
            endDecorator={
              isFetching ? (
                <CircularProgress size="sm" sx={{ bgcolor: "background.surface" }} />
              ) : null
            }
            limitTags={2}
            onChange={(event, newValue) => {
              setConfig({ ...config, specialty: newValue });
            }}
          />
        </FormControl>

      </Box>

      {/* <div>{(isFetching || isFetchingPatient) && <GeometrySkeleton transition="pulse" />}</div> */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-5">{content}</div>
    </div>
  );
}

export default ViewDoctors;
