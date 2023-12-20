import { useEffect, useState } from "react";
import Input from "../../components/InputField";
import logo from "../../../shared/assets/logo.png";
import * as yup from "yup";
import { Formik } from "formik";
import LoadingIndicator from "../../components/LoadingIndicator";
import { useNavigate } from "react-router-dom";
import { useLoginMutation, login } from "../../../store";
import ForgetPasswordScreen from "../ForgetPasswordScreen";
import OtpScreen from "../OtpScreen";
import { useDispatch } from "react-redux";
import FormErrorDialog from "../../components/FormErrorDialog";
import Button from "../../components/Button";
import Toast from "../../../patient/Toast";


export default function LoginForm(){
    const [isLoading, setIsLoading] = useState(false);
    const [forgetPassword, setForgetPassword] = useState(false);
    const [otpOpen, setOtpOpen] = useState(false);
    const navigate = useNavigate();
    const [loginMutation, results] = useLoginMutation();
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [isError, setIsError] = useState(false);

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

    useEffect(() => {
        if (results.isError) {
          // setIsError(true);
          setToast({
            ...toast,
            open: true,
            color: "danger",
            message: "Invalid username or password",
          });
        }
      }, [results]);

      const handleSubmit = async (values, { resetForm }) => {
        const user = {
          username: values.username,
          password: values.password,
        };
        
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        try {
          const result = await loginMutation(user).unwrap();
          console.log(result);
          // Use the result for navigation or other side effects
          if (result.userType === "patient") {
            dispatch(login({ role: "patient" })); // Dispatch login action with role
            navigate("/patient");
          } else if (result.userType === "pharmacist") {
            dispatch(login({ role: "pharmacist" })); // Dispatch login action with role
            navigate("/pharmacist");
          } else if (result.userType === "admin") {
            dispatch(login({ role: "admin" })); // Dispatch login action with role
            navigate("/admin");
          }
          //window.location.reload();
          resetForm({ values: "" });
        } catch (error) {
          console.error("Failed to login:", error);
        } finally {
          setIsLoading(false);
        }
      };

      const UserForm = (
        <Formik
          initialValues={initialUserValues}
          validationSchema={UserSchema}
          onSubmit={handleSubmit}>
          {(formik) => (
            <form onSubmit={formik.handleSubmit}>
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
                    <Button className="mt-4" type='submit'>Log in</Button>
                  )
                }
              </div>
            </form>
          )}
        </Formik>
      );

return (
    <>
    <div className="w-full max-w-md px-10 py-8 bg-white rounded-lg shadow-xl">
        <div className="flex justify-center mb-10">
          <img src={logo} alt="Logo" className="w-20 h-20" />
        </div>
        <h2 className="text-center  text-2xl font-bold text-gray-700 mb-6">Login</h2>
        {UserForm}
        <div className="flex flex-col sm:flex-row justify-center items-center mt-4 space-y-3 sm:space-y-0">
        <button
    className="text-sm  text-blue-500 hover:underline hover:bg-transparent bg-transparent outline-none"
    onClick={() => setForgetPassword(true)}>
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
      <div>
        <Toast {...toast} onClose={onToastClose} />
      </div>
    </>
  );
}

const UserSchema = yup.object().shape({
    username: yup
      .string("Invalid username")
      ,
    password: yup
      .string()
      .required("Please enter a valid password"),
  });

  const initialUserValues = {
    username: "",
    password: "",
  };
