import * as yup from "yup";
import {Formik} from 'formik';
import Button from '../../../shared/components/Button';
import Input from '../../../shared/components/InputField';
import './styles.css';
import Header from "../../../shared/components/Header";
import {AiOutlinePlus} from 'react-icons/ai';
import {medicinalUses} from '../../../shared/assets/mockdata.js'
import DropDown from "../../../shared/components/DropDown";


const AddMedicine = () => {


  const handleSubmit = (values, {resetForm}) => {
    console.log(values);
    resetForm({values: ''});
  }

  const medicineForm = (
    <Formik
    initialValues={formInitialValues}
    validationSchema={MedicineSchema}
    onSubmit= {handleSubmit}
  >
    {(formik) => (
      <form onSubmit={formik.handleSubmit}>
        <div className="form-container">
          <Input
          label="Medicine Name"
          id="medicineName" 
          error={formik.errors.medicineName}
          type="text"
          {...formik.getFieldProps('medicineName')}
          />
        </div>

        <div className="form-container">
          <Input
          label="Description"
          id="description" 
          type="text"
          error={formik.errors.description}
          {...formik.getFieldProps('description')}
          />
        </div>
        <div className="form-container">
        <Input
            label="Active Ingredients"
            id="activeIngredients" 
            type="text"
            error={formik.errors.activeIngredients}
            {...formik.getFieldProps('activeIngredients')}
          />
        </div>

        <div className="form-container">
          <Input
          label="Price"
          id="price" 
          type="number"
          error={formik.errors.price}
          {...formik.getFieldProps('price')}
          />
          <Input
          label="Available Quantity"
          id="availableQuantity" 
          type="number"
          error={formik.errors.availableQuantity}
          {...formik.getFieldProps('availableQuantity')}
          />
        </div>
        <div className="form-container">
          <DropDown
          options = {medicinalUses}
          id="medicinalUse"
          label= "Medicinal Use"
          error={formik.errors.medicinalUse}
          value={formik.values.medicinalUse}
          onChange={formik.handleChange}
          />
        </div>
        <div className="submit-add-medicine-button-container">
          <Button type="submit">
            <AiOutlinePlus color="#fff" size={20} />
            Add Medicine
          </Button>
        </div>
      </form>
    )}
  </Formik>
  );
  return (<div className="add-medicine-form">
    <Header header="New Medicine Form" subheader="Please Enter new medicine info" />
    {medicineForm}
  </div>);
}

const MedicineSchema = yup.object().shape({
  medicineName: yup.string().min(2, 'The medicine name entered is too short').max(100, 'The medicine name enteres is too long').required("Please Enter a medicine name"),
  price: yup.number("Please Enter a Number").positive("Price should be a positive number").required("Please enter the price field"),
  description: yup.string().min(10, 'Description should be atleast 10 characters').max(1000, 'Your description is too long').required('Please enter a description'),
  availableQuantity: yup.number().integer('Available Quantity should be an integer').min(0, 'Available Quantitiy should be non negative').required('Please enter the available quantity'),
  activeIngredients: yup.string().min(2, 'Too Short!').max(500, 'Too Long!').required('Active ingredients are required'),
  medicinalUse: yup.string().required('Please select a medicinal use')
})

const formInitialValues = {
  medicineName: '',
  price: '',
  description: '',
  availableQuantity: '',
  activeIngredients: '',
  medicinalUse: 'Antibiotic'
}

export default AddMedicine;