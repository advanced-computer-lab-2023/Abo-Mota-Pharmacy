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

const EditMedicine = ({ isOpen, onClose, medicineDetails }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { name, quantity, medicinalUse } = medicineDetails;
  const [editMedicineError, setEditMedicineError] = useState(false);

  const initialValues = {
    price: "",
    description: "",
    addQuantity: "",
    medicinalUse: medicinalUse,
    medicineImage: null,
  };
  const [editMedicine, results] = useEditMedicineMutation();
  const onSubmit = async (values, { resetForm }) => {
    const cleanedValues = { ...values };
    cleanedValues.quantity = values.addQuantity
      ? parseInt(values.addQuantity)
      : "";
    delete cleanedValues.addQuantity;
    const dataBaseValues = Object.fromEntries(
      Object.entries(cleanedValues).filter(([_, v]) => v !== "" && v !== null)
    );
    // use name and cleanedvalues to do the update
    setIsLoading(true);
    console.log("dataBase", dataBaseValues);
    await editMedicine({ name, dataBaseValues });
    setIsLoading(false);
    onClose();
  };

  useEffect(() => {
    if (results.isError) setEditMedicineError(true);
  }, [results]);

  const editMedicineForm = (
    <Formik
      initialValues={initialValues}
      validationSchema={medicineSchema}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <div className='form-container'>
            <Input
              label={`New Price`}
              id='price'
              error={formik.errors.price}
              touch={formik.touched.price}
              type='text'
              {...formik.getFieldProps("price")}
            />
          </div>
          <div className='form-container'>
            <Input
              label={`New Description`}
              id='description'
              error={formik.errors.description}
              touch={formik.touched.description}
              type='text'
              {...formik.getFieldProps("description")}
            />
          </div>
          <div className='form-container'>
            <Input
              label={`Add Quantity`}
              id='addQuantity'
              error={formik.errors.addQuantity}
              touch={formik.touched.addQuantity}
              type='number'
              {...formik.getFieldProps("addQuantity")}
            />
          </div>
          <div className='form-container'>
            <DropDown
              options={medicinalUses}
              id='medicinalUse'
              label='Change Medicinal Use'
              error={formik.errors.medicinalUse}
              value={formik.values.medicinalUse}
              touch={formik.touched.medicinalUse}
              onChange={formik.handleChange}
            />

            <FileInput
              label='Medicine Image'
              id='medicineImage'
              name='medicineImage' // Ensure this is set to correctly associate with Formik's `getFieldProps`
              error={formik.errors.medicineImage}
              touch={formik.touched.medicineImage}
              onChange={(file) => formik.setFieldValue("medicineImage", file)}
              onBlur={() => formik.setFieldTouched("medicineImage", true)} // To handle touch status
            />
          </div>
          <div className='edit-medicine-button'>
            {isLoading ? (
              <LoadingIndicator />
            ) : (
              <Button type='submit'>
                <AiOutlineEdit size={20} color='#fff' />
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
    <div className='edit-medicine-overlay'>
      <div className='edit-medicine-content'>
        <div className='edit-medicine-title'>
          <div className='edit-medicine-header'>Edit {name}</div>
          <div className='edit-medicine-exit-button' onClick={onClose}>
            {" "}
            <RxCross1 size={20} color='blue' />
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
