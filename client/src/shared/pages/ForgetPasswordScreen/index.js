import "./style.css";
import { AiOutlineClose } from "react-icons/ai";
import { Formik } from "formik";
import Input from "../../components/InputField";
import * as yup from "yup";
import Button from "../../components/Button";
import LoadingIndicator from "../../components/LoadingIndicator";
import { useState, useEffect } from "react";
import { useRequestOtpMutation } from "../../../store";
import Toast from "../../../patient/Toast";
import FormErrorDialog from "../../components/FormErrorDialog";

const ForgetPasswordScreen = ({ closeForm, goToOtp, setEmail }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [requestOtp, results] = useRequestOtpMutation();
  const [error, setError] = useState("");

  useEffect(() => {
    if (results.isError) {
      setError(results.error.data.error);
    }
  }, [results]);

  const [toast, setToast] = useState({
    open: false,
    duration: 4000,
  });

  const onToastClose = (event, reason) => {
    if (reason === "clickaway") return;

    setToast({
      ...toast,
      open: false,
    });
  };

  const handleSubmit = async (values, { resetForm }) => {
    setIsLoading(true);
    console.log(values);
    await new Promise((resolve) => setTimeout(resolve, 3000));

    requestOtp(values)
      .unwrap()
      .then((res) => {
        setIsLoading(false);
        closeForm();
        setEmail(values.email);
        goToOtp();
        resetForm({ values: "" });

        setToast({
          ...toast,
          open: true,
          color: "success",
          message: "OTP sent successfully",
        });
      })
      .catch((res) => {
        setToast({
          ...toast,
          open: true,
          color: "danger",
          message: res.data.error,
        });
      });

    setIsLoading(false);
  };
  const forgetPasswordForm = (
    <Formik
      initialValues={initialForgetPassword}
      validationSchema={ForgetPasswordSchema}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <div className='form-container'>
            <Input
              label='Email'
              icon
              type='text'
              id='email'
              error={formik.errors.email}
              touch={formik.touched.email}
              {...formik.getFieldProps("email")}
            />
          </div>
          <div className='submit-add-medicine-button-container'>
            {
              isLoading ? (
                <LoadingIndicator />
              ) : (
                // <Link to='medicine'>
                <Button type='submit'>Send Code</Button>
              )
              // </Link>
            }
          </div>
        </form>
      )}
    </Formik>
  );

  console.log(results);
  return (
    <div className='forget-password-portal-container'>
      <FormErrorDialog
        isError={error}
        setClose={() => setError("")}
        message={error || "An error occured"}
      />
      <div className='forget-password-portal'>
        <div className='forget-close-button-container'>
          <h1 className='forget-password-header'>Forgot Password</h1>
          <span
            className='forget-password-close-button-span'
            onClick={closeForm}
          >
            <AiOutlineClose size={30} color='black' />
          </span>
        </div>
        {forgetPasswordForm}
        <p className='forget-password-paragraph'>
          We’ll send a verification code to this email if it matches an existing
          Abo Mota account.
        </p>
      </div>

      <div>
        <Toast {...toast} onClose={onToastClose} />
      </div>
    </div>
  );
};

const ForgetPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email")
    .required("Please enter a valid email address"),
});

const initialForgetPassword = {
  email: "",
};

export default ForgetPasswordScreen;
