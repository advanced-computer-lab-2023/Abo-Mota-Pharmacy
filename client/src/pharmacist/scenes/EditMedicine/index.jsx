import './styles.css';
import {RxCross1} from 'react-icons/rx';
import Input from '../../../shared/components/InputField';
import {Formik} from 'formik';
import * as yup from 'yup';
import { medicinalUses } from '../../../shared/assets/mockdata';
import DropDown from '../../../shared/components/DropDown';
import Button from '../../../shared/components/Button';
import { AiOutlineEdit } from 'react-icons/ai';
import { useState } from 'react';
import LoadingIndicator from '../../../shared/components/LoadingIndicator';
import { useEditMedicineMutation } from '../../../store';


const EditMedicine = ({isOpen, onClose, medicineDetails}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { name, quantity, medicinalUse} = medicineDetails;

  const initialValues = {
    price: '',
    description: '',
    addQuantity: '',
    medicinalUse: medicinalUse
  };
  // console.log(medicinalUse);
  // console.log(medicineDetails);
  const [editMedicine,results] = useEditMedicineMutation();
  // console.log('medicineDetails' , medicineDetails);
  const onSubmit = async (values, {resetForm}) => {
    // console.log(values);
    const cleanedValues = {...values};
    cleanedValues.quantity = values.addQuantity ? parseInt(quantity) + parseInt(values.addQuantity) : '';
    delete cleanedValues.addQuantity
    const dataBaseValues = Object.fromEntries(Object.entries(cleanedValues).filter(([_, v]) => v !== ''));
    // use name and cleanedvalues to do the update
    setIsLoading(true);
    console.log('dataBase', dataBaseValues);
    await editMedicine({name,dataBaseValues});
    // await new Promise(resolve => setTimeout(resolve, 3000));
    // Remove the above await and insert code for backend registeration here.
    setIsLoading(false);
    onClose();
  };

  const editMedicineForm = (
    <Formik 
    initialValues={initialValues}
    validationSchema={medicineSchema}
    onSubmit={onSubmit}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <div className="form-container">
          <Input
          label={`New Price`}
          id="price" 
          error={formik.errors.price}
          touch={formik.touched.price}
          type="text"
          {...formik.getFieldProps('price')}
          />
        </div>          
        <div className="form-container">
          <Input
          label={`New Description`}
          id="description" 
          error={formik.errors.description}
          touch={formik.touched.description}
          type="text"
          {...formik.getFieldProps('description')}
          />
        </div>          
        <div className="form-container">
          <Input
          label={`Add Quantity`}
          id="addQuantity" 
          error={formik.errors.addQuantity}
          touch={formik.touched.addQuantity}
          type="number"
          {...formik.getFieldProps('addQuantity')}
          />
        </div>
        <div className="form-container">
        <DropDown
          options = {medicinalUses}
          id="medicinalUse"
          label= "Change Medicinal Use"
          error={formik.errors.medicinalUse}
          value={formik.values.medicinalUse}
          touch={formik.touched.medicinalUse}
          onChange={formik.handleChange}
        />
        </div>
        <div className='edit-medicine-button'>
{ isLoading ? <LoadingIndicator /> :<Button type="submit">
                <AiOutlineEdit size={20} color='#fff' />
                Apply Changes
              </Button>}
        </div>
        </form>
      )}
    </Formik>
  );
  if(!isOpen) return null;
  return(
    <div className="edit-medicine-overlay">
      <div className="edit-medicine-content">
        <div className='edit-medicine-title'>
          <div className='edit-medicine-header'>Edit {name}</div>
          <div className='edit-medicine-exit-button' onClick={onClose}> <RxCross1 size={20} color='blue'/></div>
        </div>
        {editMedicineForm}
      </div>
    </div>
  );
};

const medicineSchema = yup.object().shape({
  price: yup.number().positive('Price should be a positive number'),
  
  description: yup.string().min(10, 'Description should be at least 10 characters').max(1000, 'Description is too long'),
  
  addQuantity: yup.number().integer('Available quantity should be an integer').min(0, 'Available quantity should be non-negative'),

  medicinalUse: yup.string().min(5, 'Medicinal use should be at least 5 characters').max(500, 'Medicinal use is too long')
});

export default EditMedicine;