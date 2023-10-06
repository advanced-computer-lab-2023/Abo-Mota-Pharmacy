import './styles.css';
import {RxCross1} from 'react-icons/rx';
import Input from '../../../shared/components/InputField';
import {Formik} from 'formik';
import * as yup from 'yup';
import { medicinalUses } from '../../../shared/assets/mockdata';
import DropDown from '../../../shared/components/DropDown';
import Button from '../../../shared/components/Button';
import { AiOutlineEdit } from 'react-icons/ai';


const EditMedicine = ({isOpen, onClose, medicineDetails}) => {
  const {name, price, description, extras} = medicineDetails;
  const {availableQuantity, medicinalUse} = extras;

  const initialValues = {
    price: '',
    description: '',
    addQuantity: '',
    medicinalUse: medicinalUse
  };

  const onSubmit = (values) => {
    console.log(values);
    values.availableQuantity = values.addQuantity ? parseInt(availableQuantity) + parseInt(values.addQuantity) : '';
    delete values.addQuantity;
    const cleanedValues = Object.fromEntries(Object.entries(values).filter(([_, v]) => v !== ''));
    console.log(cleanedValues);
    // use name and cleanedvalues to do the update
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
              <Button type="submit">
                <AiOutlineEdit size={20} color='#fff' />
                Apply Changes
              </Button>
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