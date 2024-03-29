import "./styles.css";
import { RxCross1 } from "react-icons/rx";
import Input from "../../../shared/components/InputField";
import { Formik } from "formik";
import * as yup from "yup";
import { medicinalUses } from "../../../shared/assets/mockdata";
import DropDown from "../../../shared/components/DropDown";
import Button from "../../../shared/components/Button";
import { AiOutlineEdit } from "react-icons/ai";
import { useEffect, useState } from "react";
import LoadingIndicator from "../../../shared/components/LoadingIndicator";
import { useEditMedicineMutation } from "../../../store";
import FileInput from "../../../shared/components/FileInput";
import FormErrorDialog from "../../../shared/components/FormErrorDialog";

const EditMedicine = ({ isOpen, onClose, medicineDetails, isOverTheCounter }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { name, quantity, medicinalUse } = medicineDetails;
  const [editMedicineError, setEditMedicineError] = useState(false);

  console.log("afa", isOverTheCounter);

  const initialValues = {
    price: "",
    description: "",
    addQuantity: "",
    medicinalUse: medicinalUse,
    medicineImage: null,
    isOverTheCounter: isOverTheCounter,
  };
  const [editMedicine, results] = useEditMedicineMutation();
  // console.log("results", results);
  const onSubmit = async (values, { resetForm }) => {
    const cleanedValues = { ...values };
    console.log("cleanedValues", cleanedValues);
    cleanedValues.quantity = values.addQuantity ? parseInt(values.addQuantity) : "";
    delete cleanedValues.addQuantity;
    let dataBaseValues = Object.fromEntries(
      Object.entries(cleanedValues).filter(([_, v]) => v !== "" && v !== null)
    );
    dataBaseValues.isOverTheCounter = dataBaseValues.isOverTheCounter === "true";
    // use name and cleanedvalues to do the update
    setIsLoading(true);
    console.log("dataBase", { name, dataBaseValues });

    await editMedicine({ name, dataBaseValues });
    setIsLoading(false);
    onClose();
  };

  useEffect(() => {
    if (results.isError) setEditMedicineError(true);
  }, [results]);

  const editMedicineForm = (
    <Formik initialValues={initialValues} validationSchema={medicineSchema} onSubmit={onSubmit}>
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <div className="form-container">
            <Input
              label={`New Price`}
              id="price"
              error={formik.errors.price}
              touch={formik.touched.price}
              type="text"
              {...formik.getFieldProps("price")}
            />
          </div>
          <div className="form-container">
            <Input
              label={`New Description`}
              id="description"
              error={formik.errors.description}
              touch={formik.touched.description}
              type="text"
              {...formik.getFieldProps("description")}
            />
          </div>
          <div className="form-container">
            <Input
              label={`Add Quantity`}
              id="addQuantity"
              error={formik.errors.addQuantity}
              touch={formik.touched.addQuantity}
              type="number"
              {...formik.getFieldProps("addQuantity")}
            />

            <DropDown
              options={["true", "false"]}
              id="isOverTheCounter"
              label="Change is Over The Counter"
              error={formik.errors.isOverTheCounter}
              value={formik.values.isOverTheCounter}
              touch={formik.touched.isOverTheCounter}
              onChange={formik.handleChange}
            />
          </div>
          <div className="form-container">
            <DropDown
              options={medicinalUses}
              id="medicinalUse"
              label="Change Medicinal Use"
              error={formik.errors.medicinalUse}
              value={formik.values.medicinalUse}
              touch={formik.touched.medicinalUse}
              onChange={formik.handleChange}
            />
          </div>
          <div className="edit-medicine-button">
            {isLoading ? (
              <LoadingIndicator />
            ) : (
              <Button type="submit">
                <AiOutlineEdit size={20} color="#fff" />
                Apply Changes
              </Button>
            )}
          </div>
        </form>
      )}
    </Formik>
  );
  if (!isOpen) return null;
  return (
    <div className="edit-medicine-overlay">
      <div className="edit-medicine-content">
        <div className="edit-medicine-title">
          <div className="edit-medicine-header">Edit {name}</div>
          <div className="edit-medicine-exit-button" onClick={onClose}>
            {" "}
            <RxCross1 size={20} color="blue" />
          </div>
        </div>
        {editMedicineForm}
      </div>
      <FormErrorDialog
        isError={editMedicineError}
        setClose={() => setEditMedicineError(false)}
        message={"An error occurred while editing medicine"}
      />
    </div>
  );
};

const FILE_SIZE = 10000 * 1024; // e.g., 160 KB
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

const medicineSchema = yup.object().shape({
  price: yup.number().positive("Price should be a positive number"),

  isOverTheCounter: yup.string(),

  description: yup
    .string()
    .min(10, "Description should be at least 10 characters")
    .max(1000, "Description is too long"),

  addQuantity: yup
    .number()
    .integer("Available quantity should be an integer")
    .min(0, "Available quantity should be non-negative"),

  medicinalUse: yup
    .string()
    .min(5, "Medicinal use should be at least 5 characters")
    .max(500, "Medicinal use is too long"),

  medicineImage: yup
    .mixed()
    .nullable()
    .test("fileFormat", "Unsupported Format", (value) => {
      if (!value) return true;
      let file = value instanceof FileList ? value[0] : value;
      return file && SUPPORTED_FORMATS.includes(file.type);
    })
    .test("fileSize", "File too large", (value) => {
      if (!value) return true;
      let file = value instanceof FileList ? value[0] : value;
      return file && file.size <= FILE_SIZE;
    }),
});

export default EditMedicine;
