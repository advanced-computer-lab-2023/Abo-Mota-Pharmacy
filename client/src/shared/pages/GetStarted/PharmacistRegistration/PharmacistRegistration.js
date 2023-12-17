import React, { useState, useEffect } from 'react';
import {  message, Steps } from 'antd';
import Button from "../../../components/Button.js";
import BasicInformation from './BasicInformation.js';
import ProfessionalDetails from './ProfessionalDetails.js';
import Credentials from './Credentials.js';
import AccountSetUp from './AccountSetUp.js';
import PharmacistSchema from './Validation.js';
import { Formik } from "formik";
import { useRegisterPharmacistMutation } from "../../../../store/index.js";
import { useNavigate } from "react-router-dom";
import FormErrorDialog from "../../../components/FormErrorDialog/index.js";
import { UserOutlined, SolutionOutlined, FileProtectOutlined, IdcardOutlined } from '@ant-design/icons';


const { Step } = Steps;

export default function PharmacistRegistration(){
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [registerPharmacist, results] = useRegisterPharmacistMutation();
  const [isError, setIsError] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async (values, { resetForm }) => {
    const pharmacist = {
      dob: values.dateOfBirth,
      email: values.email,
      name: `${values.firstName} ${values.lastName}`,
      gender: values.gender,
      mobile: values.mobileNumber,
      nationalId: values.nationalId,
      username: values.userName,
      password: values.password,
      rate: values.hourlyRate,
      affiliation: values.affiliation,
      educationalBackground: values.educationalBackground,
      workingLicense: values.workingLiscense,
      pharmacyDegree: values.pharmacyDegree,
    };
    setIsLoading(true);
    await registerPharmacist(pharmacist);
    //navigate('/');
    console.log(pharmacist)
    setIsLoading(false);
    console.log(results);
  };

  useEffect(() => {
    if (results.isError) {
      setIsError(results.error.data.error);
    }
  }, [results]);
    

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
    console.log(initialPharmacistValues);
  };


  const steps = [
    {
      title: 'Personal Information',
      content: BasicInformation,
      icon: <UserOutlined />,
    },
    {
      title: 'Account',
      content: AccountSetUp,
      icon: <IdcardOutlined />,
    },
    {
      title: 'Professional Details',
      content: ProfessionalDetails,
      icon: <SolutionOutlined />,
    },
    {
      title: 'Credentials',
      content: Credentials,
      icon: <FileProtectOutlined />,
    },
  ];


  return (<>
  <FormErrorDialog
        isError={isError}
        setClose={() => setIsError("")}
        message={isError}
      />
    <Formik
      initialValues={initialPharmacistValues}
      validationSchema={PharmacistSchema}
      onSubmit={handleSubmit}
      >
      {formik => (
        
          <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-md">
            <Steps current={currentStep} className="mb-6">
            {steps.map((step, index) => (
            <Step key={step.title} title={currentStep === index ? step.title : ''} icon={step.icon} />
              ))}
            </Steps>
  
            <div className="steps-content " style={{ minHeight: '300px' }}> {/* Adjusted margin and min-height */}
              {React.createElement(steps[currentStep].content, { formik })}
            </div>
  
            <div className="flex justify-end space-x-2">
              {currentStep > 0 && (
                <Button onClick={handlePrev} className="bg-gray-300 text-black">
                  Previous
                </Button>
              )}
              {currentStep < steps.length - 1 && (
                <Button onClick={handleNext} className="bg-blue-500 text-white ">
                  Next
                </Button>
              )}
              {currentStep === steps.length - 1 && (
      <Button
          type='secondary'
          className={ `bg-green-500 text-white ${ !formik.isValid||formik.isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={() => {
            console.log(formik.values);
            formik.handleSubmit();}}>
        Submit
      </Button>
  )}
            </div>
          </div>
      )}
    </Formik>
  </>
  );
}
const initialPharmacistValues = {
  userName: "",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  dateOfBirth: "",
  hourlyRate: "",
  affiliation: "",
  pharmacyDegree: null,
  gender: "male",
  mobileNumber: "",
  nationalId: null,
  workingLicense: null,
  educationalBackground: "",
};

