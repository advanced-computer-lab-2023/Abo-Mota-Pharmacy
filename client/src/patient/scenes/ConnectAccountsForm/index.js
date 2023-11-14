import Button from "../../../shared/components/Button";
import { useEffect, useState } from "react";
import Input from "../../../shared/components/InputField";
import * as yup from "yup";
import Header from "../../../shared/components/Header";
import { Formik } from "formik";
import LoadingIndicator from "../../../shared/components/LoadingIndicator";
import { login, useRegisterPatientMutation } from "../../../store";
import { useNavigate } from "react-router-dom";

const ConnectAccountForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [registerPatient, results] = useRegisterPatientMutation();
  const [error, setError] = useState("");
  const [patient, setPatient] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    if (results.isError) {
      setError(results.error.data.message);
      // console.log(error);
    } else if (results.isSuccess) {
      setPatient(results.data);
      // console.log(patient);
    }
  }, [results]);

  const handleSubmit = async (values, { resetForm }) => {
    // values contains all the data needed for registeration
    console.log(values);
  
    setIsLoading(true);
    // dispatch(login({ role: "patient" }));
    await new Promise(resolve => setTimeout(resolve, 3000));
    // Remove the above await and insert code for backend registeration here.
    setIsLoading(false);
    resetForm({ values: "" });
    //navigate("/");
  };

  const changePasswordForm = (
    <Formik
    initialValues={connectAccountSchema}
    validationSchema={connectInitialValues}
    onSubmit={handleSubmit}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <div className="form-container">         
            <Input 
            label="User Name*" 
            icon
            type="userName" 
            id="userName"
            error={formik.errors.userName}
            touch={formik.touched.userName}
            {...formik.getFieldProps('userName')}
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
                Connect
              </Button>
            // </Link>
          }
        </div>
        </form>
      )}

    </Formik>
    );


  return (
    <div className='change-password-container'>
          <div className="change-password-screen">
          <Header header="Connect Account Form" />
          {changePasswordForm}
        </div>
      </div>
  );
};

const connectAccountSchema = yup.object().shape({
  userName: yup
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(50, "Username must be at most 50 characters long")
    .required("Please enter a valid username"),

  password: yup
    .string()
    .min(8, "Password must be at least 8 characters long")
    .matches(/[a-zA-Z]/, "Password must contain at least one letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .required("Please enter a valid password"),
});

const connectInitialValues = {
  userName: "",
  password: "",
};

export default ConnectAccountForm;
