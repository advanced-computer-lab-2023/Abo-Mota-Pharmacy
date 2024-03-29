import Button from "../../../shared/components/Button";
import { useEffect, useState } from "react";
import Input from "../../../shared/components/InputField";
import * as yup from "yup";
import Header from "../../../shared/components/Header";
import { Formik } from "formik";
import LoadingIndicator from "../../../shared/components/LoadingIndicator";
import {
  login,
  useLinkWithClinicMutation,
  useRegisterPatientMutation,
} from "../../../store";
import { useNavigate } from "react-router-dom";
import FormErrorDialog from "../../../shared/components/FormErrorDialog";

const ConnectAccountForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [linkWithClinic, results] = useLinkWithClinicMutation();
  const navigate = useNavigate();
  useEffect(() => {
    if (results.isError) {
      setError(results.error.data.error);
    } else if (results.isSuccess) {
    }
  }, [results]);
  const handleSubmit = async (values, { resetForm }) => {
    console.log(values);

    setIsLoading(true);
    await linkWithClinic(values);
    setIsLoading(false);
    resetForm({ values: "" });
  };

  console.log(results);

  const changePasswordForm = (
    <Formik
      initialValues={connectInitialValues}
      validationSchema={connectAccountSchema}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <div className='form-container'>
            <Input
              label='Username*'
              icon
              type='username'
              id='username'
              error={formik.errors.username}
              touch={formik.touched.username}
              {...formik.getFieldProps("username")}
            />
          </div>
          <div className='form-container'>
            <Input
              label='Password*'
              icon
              type='password'
              id='password'
              error={formik.errors.password}
              touch={formik.touched.password}
              {...formik.getFieldProps("password")}
            />
          </div>
          <div className='submit-add-medicine-button-container'>
            {
              isLoading ? (
                <LoadingIndicator />
              ) : (
                // <Link to='medicine'>
                <Button type='submit'>Connect</Button>
              )
              // </Link>
            }
          </div>
        </form>
      )}
    </Formik>
  );

  return (
    <div className='change-password-container'>
      <FormErrorDialog isError={error !== ""} setClose={() => setError("")} />
      <div className='change-password-screen'>
        <Header header='Connect Account Form' />
        {changePasswordForm}
      </div>
    </div>
  );
};

const connectAccountSchema = yup.object().shape({
  username: yup
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
  username: "",
  password: "",
};

export default ConnectAccountForm;
