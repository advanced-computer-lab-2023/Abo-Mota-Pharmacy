import Button from "../../components/Button";
import { useEffect, useState } from "react";
import Input from "../../components/InputField";
import "./styles.css";
import logo from "../../../shared/assets/logo.png";
import * as yup from "yup";
import Header from "../../components/Header";
import { Formik } from "formik";
import LoadingIndicator from "../../components/LoadingIndicator";
import { useNavigate } from "react-router-dom";
import ForgetPasswordScreen from "../ForgetPasswordScreen";
import OtpScreen from "../OtpScreen";
import { login, useLoginMutation } from "../../../store";
import { useDispatch } from "react-redux";
import FormErrorDialog from "../../components/FormErrorDialog";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [forgetPassword, setForgetPassword] = useState(false);
  const [otpOpen, setOtpOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const navigate = useNavigate();
  const [loginMutation, results] = useLoginMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (results.error) {
      setOpenDialog(true);
    }
  }, [results]);

  const handleSubmit = async (values, { resetForm }) => {
    // values contains all the data needed for registeration
    // console.log(values);
    const user = {
      username: values.username,
      password: values.password,
    };
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));

    try {
      const result = await loginMutation(user).unwrap();
      // Use the result for navigation or other side effects
      if (result.userType === "patient") {
        dispatch(login({ role: "patient" }));
        navigate("/patient/medicine");
      } else if (result.userType === "pharmacist") {
        dispatch(login({ role: "pharmacist" }));
        navigate("/pharmacist");
      } else if (result.userType === "admin") {
        dispatch(login({ role: "admin" }));
        navigate("/admin");
      }
      resetForm({ values: "" });
    } catch (error) {
      console.error("Failed to login:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const PharmacistForm = (
    <Formik
      initialValues={initialPharmacistValues}
      validationSchema={PharmacistSchema}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          {console.log(formik.values)}
          <div className='form-container'>
            <Input
              label='Username*'
              icon
              type='text'
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
                <Button type='submit'>Log in</Button>
              )
              // </Link>
            }
          </div>
        </form>
      )}
    </Formik>
  );

  console.log("res", results);
  return (
    <div className='login-div'>
      <div className='login-portal'>
        <div className='login-part'>
          <div className='login-logo-div'>
            {" "}
            <img className='login-logo' src={logo} alt='logo' />{" "}
          </div>
          <Header header='Welcome Back!' type='login-header' />
        </div>
        <p className='login-word'>Login</p>
        {PharmacistForm}
        <div
          className='flex justify-between mr-8 ml-8'
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginRight: "8px",
            marginLeft: "8px",
          }}
        >
          <button
            className='forget-password-button'
            onClick={() => {
              navigate("/registerPharmacist");
            }}
          >
            Register as Pharmacist?
          </button>
          <button
            className='forget-password-button'
            onClick={() => {
              navigate("/registerPatient");
            }}
          >
            Register as Patient?
          </button>

          <button
            className='forget-password-button'
            onClick={() => {
              setForgetPassword(true);
            }}
          >
            Forgot Password?
          </button>
        </div>
      </div>
      {forgetPassword && (
        <ForgetPasswordScreen
          closeForm={() => {
            setForgetPassword(false);
          }}
          goToOtp={() => {
            setOtpOpen(true);
          }}
          setEmail={setEmail}
        />
      )}
      {otpOpen && (
        <OtpScreen
          closeForm={() => {
            setOtpOpen(false);
          }}
          email={email}
        />
      )}
      <FormErrorDialog
        isError={openDialog}
        setClose={() => {
          setOpenDialog(false);
        }}
      />
    </div>
  );
};

const PharmacistSchema = yup.object().shape({
  username: yup.string().required("Please enter a valid username"),

  password: yup.string(),
});

const initialPharmacistValues = {
  username: "",
  password: "",
};

export default LoginForm;
