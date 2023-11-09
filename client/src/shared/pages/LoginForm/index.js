import Button from "../../components/Button";
import { useEffect, useState } from "react";
import Input from "../../components/InputField";
import './styles.css';
import logo from '../../../shared/assets/logo.png';
import * as yup from 'yup';
import Header from "../../components/Header";
import { Formik } from "formik";
import LoadingIndicator from "../../components/LoadingIndicator";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../../store";


const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [pharmacist, setPharmacist] = useState({});
  const [login, results] = useLoginMutation();


  const handleSubmit = async (values, { resetForm }) => {
    // values contains all the data needed for registeration
    // console.log(values);
    console.log(values);
    const user = {
      username: values.username,
      password: values.password,
    }
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 3000));

    try {
      const result = await login(user).unwrap();
      console.log(result);
      // Use the result for navigation or other side effects
      if (result.userType === "patient") {
        navigate("/patient");
      } else if (result.userType === "pharmacist") {
        navigate("/pharmacist");
      } else if (result.userType === "admin") {
        navigate("/admin");
      }
      resetForm({ values: "" });
    } catch (error) {
      console.error("Failed to login:", error);
    } finally {
      setIsLoading(false);
    }

};

const forgetPasswordOnClick = () => {
  console.log("forget password");
}


  const PharmacistForm = (
    <Formik
    initialValues={initialPharmacistValues}
    validationSchema={PharmacistSchema}
    onSubmit={handleSubmit}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          {console.log(formik.values)}
          <div className="form-container">         
            <Input
              label="Username*"
              icon
              type="text"
              id="username"
              error={formik.errors.username}
              touch={formik.touched.username}
              {...formik.getFieldProps("username")}
            />
          </div>
          <div className="form-container">
            <Input 
            label="Password*" 
            icon
            type="password" 
            id="password"
            error={formik.errors.password}
            touch={formik.touched.password}
            {...formik.getFieldProps('password')}
            />
          </div>
          <div className="submit-add-medicine-button-container">
          {isLoading ? <LoadingIndicator /> :
            // <Link to='medicine'>
              <Button type="submit">
                Log in
              </Button>
            // </Link>
          }
        </div>
        </form>
      )}

    </Formik>
  );
   
  return (
    <div className="login-div">
      <div className="login-portal">
        <div className="login-part">
        <div className="login-logo-div"> <img className="login-logo" src={logo} alt="logo"/> </div>
        <Header header="Welcome Back!" type="login-header"/>
        </div>
        <p className="login-word">Login</p>
        {PharmacistForm}
        <div className="forget-password-container">
          <button className="forget-password-button" onClick={forgetPasswordOnClick}>
            Forget Password?
          </button>
        </div>
      </div>
    </div>
  );
}



const PharmacistSchema = yup.object().shape({
  username: yup.string().required('Please enter a valid username'),

  password: yup.string().min(8, 'Password must be at least 8 characters long').matches(/[a-zA-Z]/, 'Password must contain at least one letter').matches(/[0-9]/, 'Password must contain at least one number').required('Please enter a valid password'),

});


const initialPharmacistValues = {
  username: '',
  password: ''
};



export default LoginForm;