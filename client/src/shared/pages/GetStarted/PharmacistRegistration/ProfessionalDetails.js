// ProfessionalDetails.js
import React from 'react';
import Input from "../../../components/InputField/index.jsx";


const ProfessionalDetails = ({ formik }) => {
  return (
    <div className="space-y-4">
        <Input
              label='Affliation(Hospital)*'
              type='text'
              id='affiliation'
              error={formik.errors.affiliation}
              touch={formik.touched.affiliation}
              {...formik.getFieldProps("affiliation")}
            />
        <Input
              label='Educational Background*'
              type='text'
              id='educationalBackground'
              error={formik.errors.educationalBackground}
              touch={formik.touched.educationalBackground}
              {...formik.getFieldProps("educationalBackground")}
            />
        <Input
              label='Hourly rate in USD*'
              type='number'
              id='hourlyRate'
              error={formik.errors.hourlyRate}
              touch={formik.touched.hourlyRate}
              {...formik.getFieldProps("hourlyRate")}
            />
      
    </div>
  );
};

export default ProfessionalDetails;
