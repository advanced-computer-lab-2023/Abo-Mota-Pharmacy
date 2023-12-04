import * as yup from "yup";
import { Formik } from "formik";
import Button from "../../../shared/components/Button";
import Input from "../../../shared/components/InputField";
import "./styles.css";
import Header from "../../../shared/components/Header";
import { AiOutlinePlus } from "react-icons/ai";
import { medicinalUses } from "../../../shared/assets/mockdata.js";
import DropDown from "../../../shared/components/DropDown";
import LoadingIndicator from "../../../shared/components/LoadingIndicator";
import { useEffect, useState } from "react";
import { useAddMedicineMutation, useGetPharmacistQuery } from "../../../store";
import FileInput from "../../../shared/components/FileInput";

import { useNavigate } from "react-router-dom";

const AddMedicine = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [addMedicine, results] = useAddMedicineMutation();
  const [addMedicineError, setAddMedicineError] = useState("");
  const navigate = useNavigate();
  // console.log(results);
  useEffect(() => {
    if (results.error) {
      setAddMedicineError(results.error.data.message);
      console.log(addMedicineError);
    }
  }, [results]);

  const handleSubmit = async (values, { resetForm }) => {
    // values contains all the data needed for registeration
    // console.log(values);
    // console.log(data);

    const medicineObj = {
      name: values.medicineName,
      price: values.price,
      description: values.description,
      sales: values.sales,
      quantity: values.availableQuantity,
      activeIngredients: values.activeIngredients.split(",").map((ingredient) => ingredient.trim()),
      medicinalUse: values.medicinalUse,
      medicineImage: values.medicineImage,
    };
    console.log(medicineObj);
    setIsLoading(true);
    await addMedicine(medicineObj);
    navigate("/pharmacist/medicine");
    setIsLoading(false);
    resetForm({ values: "" });
  };

  const medicineForm = (
    <Formik
      initialValues={formInitialValues}
      validationSchema={MedicineSchema}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <div className="form-container">
            <Input
              label="Medicine Name"
              id="medicineName"
              error={formik.errors.medicineName}
              touch={formik.touched.medicineName}
              type="text"
              {...formik.getFieldProps("medicineName")}
            />
            <FileInput
              label="Medicine Image*"
              id="medicineImage"
              name="medicineImage" // Ensure this is set to correctly associate with Formik's `getFieldProps`
              error={formik.errors.medicineImage}
              touch={formik.touched.medicineImage}
              onChange={(file) => formik.setFieldValue("medicineImage", file)}
              onBlur={() => formik.setFieldTouched("medicineImage", true)} // To handle touch status
            />
          </div>

          <div className="form-container">
            <Input
              label="Description"
              id="description"
              type="text"
              error={formik.errors.description}
              touch={formik.touched.description}
              {...formik.getFieldProps("description")}
            />
            <Input
              label="Active Ingredients"
              id="activeIngredients"
              type="text"
              touch={formik.touched.activeIngredients}
              error={formik.errors.activeIngredients}
              {...formik.getFieldProps("activeIngredients")}
            />
          </div>

          <div className="form-container">
            <Input
              label="Price"
              id="price"
              type="number"
              error={formik.errors.price}
              touch={formik.touched.price}
              {...formik.getFieldProps("price")}
            />
            <Input
              label="Available Quantity"
              id="availableQuantity"
              type="number"
              error={formik.errors.availableQuantity}
              touch={formik.touched.availableQuantity}
              {...formik.getFieldProps("availableQuantity")}
            />
          </div>
          <div className="form-container">
            <DropDown
              options={medicinalUses}
              id="medicinalUse"
              label="Medicinal Use"
              error={formik.errors.medicinalUse}
              value={formik.values.medicinalUse}
              touch={formik.touched.medicinalUse}
              onChange={formik.handleChange}
            />
          </div>
          <div className="submit-add-medicine-button-container">
            {isLoading ? (
              <LoadingIndicator />
            ) : (
              <Button type="submit">
                <AiOutlinePlus color="#fff" size={20} />
                Add Medicine
              </Button>
            )}
          </div>
        </form>
      )}
    </Formik>
  );
  return (
    <div className="add-medicine-form">
      <Header header="New Medicine Form" subheader="Please Enter new medicine info" />
      {medicineForm}
    </div>
  );
};
const FILE_SIZE = 160 * 1024; // e.g., 160 KB
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

const MedicineSchema = yup.object().shape({
  medicineName: yup
    .string()
    .min(2, "The medicine name entered is too short")
    .max(100, "The medicine name enteres is too long")
    .required("Please Enter a medicine name"),
  price: yup
    .number("Please Enter a Number")
    .positive("Price should be a positive number")
    .required("Please enter the price field"),
  description: yup
    .string()
    .min(10, "Description should be atleast 10 characters")
    .max(1000, "Your description is too long")
    .required("Please enter a description"),
  availableQuantity: yup
    .number()
    .integer("Available Quantity should be an integer")
    .min(0, "Available Quantitiy should be non negative")
    .required("Please enter the available quantity"),
  activeIngredients: yup
    .string()
    .min(2, "Too Short!")
    .max(500, "Too Long!")
    .required("Active ingredients are required"),
  medicinalUse: yup.string().required("Please select a medicinal use"),
  medicineImage: yup
    .mixed()
    .required("A file is required")
    .test("fileFormat", "Unsupported Format", (value) => {
      let file = value instanceof FileList ? value[0] : value;
      return file && SUPPORTED_FORMATS.includes(file.type);
    })
    .test("fileSize", "File too large", (value) => {
      let file = value instanceof FileList ? value[0] : value;
      return file && file.size <= FILE_SIZE;
    }),
});

const formInitialValues = {
  medicineName: "",
  price: "",
  description: "",
  availableQuantity: "",
  activeIngredients: "",
  medicinalUse: "Antibiotic",
  medicineImage: null,
};

export default AddMedicine;
