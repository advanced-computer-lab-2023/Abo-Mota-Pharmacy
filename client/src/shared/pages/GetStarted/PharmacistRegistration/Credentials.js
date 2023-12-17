// Credentials.js
import FileInput from "../../../components/FileInput/index.js";

const Credentials = ({ formik }) => {
  return (
    <div className="space-y-4">
        <FileInput
              label='NationalID*'
              id='nationalId'
              name='nationalId' // Ensure this is set to correctly associate with Formik's `getFieldProps`
              error={formik.errors.nationalId}
              touch={formik.touched.nationalId}
              onChange={(file) => formik.setFieldValue("nationalId", file)}
              onBlur={() => formik.setFieldTouched("nationalId", true)} // To handle touch status
            />
      <FileInput
              label='Pharmacy Degree*'
              id='pharmacyDegree'
              name='pharmacyDegree' // Ensure this is set to correctly associate with Formik's `getFieldProps`
              error={formik.errors.pharmacyDegree}
              touch={formik.touched.pharmacyDegree}
              onChange={(file) => formik.setFieldValue("pharmacyDegree", file)}
              onBlur={() => formik.setFieldTouched("pharmacyDegree", true)} // To handle touch status
            />
      <FileInput
              label='Working Liscense*'
              id='workingLiscense'
              name='workingLiscense' // Ensure this is set to correctly associate with Formik's `getFieldProps`
              error={formik.errors.workingLicense}
              touch={formik.touched.workingLicense}
              onChange={(file) => formik.setFieldValue("workingLicense", file)}
              onBlur={() => formik.setFieldTouched("workingLicense", true)} // To handle touch status
            />
    </div>
  );
};

export default Credentials;
