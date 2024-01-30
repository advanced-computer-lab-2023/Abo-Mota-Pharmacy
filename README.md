# Abo Mota Pharmacy

## Motivation

Abo Mota Pharmacy is a full pharmacy platform created as an additional module for the Abo Mota Clinic platform, using the MERN stack. Abo Mota Pharmacy's goal is to provide a user friendly ecommerce shopping experience for over the counter medications as well as full cross platform prescription support from the clinic platform. Abo Mota Pharmacy also gives pharmacists the opportunity to apply and manage medicine inventory to provide the highest quality medications to the customer.

## Build Status

- The project is currently in development.
- A CI/CD pipeline needs to be implemented.
- The project needs to be deployed through cloud services.
- The project needs a robust unit test suite made with frameworks such as Jest.
- A message broker needs to be added to the application to handle asynchronous tasks such as sending emails and notifications.
- Additional features like video chat between pharmacists and doctors, and enhancements to the landing page, are currently under development.
- Form validation and additional loading indicators should be developed more strongly, uniformly, and in a reusable manner in the frontend.

## Code Style

- [Eslint](https://eslint.org/docs/latest/user-guide/getting-started) : in the backend and the frontend to write the most optimum clean code possible and to define rules for the team to be able to write code in the same code style
- [Prettier](https://prettier.io/) : it is a code formatter that runs automatically before each commit on the whole code so that the codes looks well formatted across the whole project

## Screenshots

<details>
<summary><h3>Landing Page</h3></summary>
<img width="1000" alt="login" src="./screenshots/l1.png">
<img width="1000" alt="login" src="./screenshots/l2.png">
<img width="1000" alt="login" src="./screenshots/l3.png">
<img width="1000" alt="login" src="./screenshots/l4.png">
<img width="1000" alt="login" src="./screenshots/l5.png">
</details>

<details>
<summary><h3>Login Page</h3></summary>
<img width="1000" alt="login" src="./screenshots/login.png">
</details>

<details>
<summary><h3>Patient</h3></summary>
<img width="1000" alt="login" src="./screenshots/medicinePatient.png">
<img width="1000" alt="login" src="./screenshots/ordersPatient.png">
<img width="1000" alt="login" src="./screenshots/alternativePatients.png">
<img width="1000" alt="login" src="./screenshots/patientSettings.png">
<img width="1000" alt="login" src="./screenshots/patientD1.png">
<img width="1000" alt="login" src="./screenshots/patientD2.png">
<img width="1000" alt="login" src="./screenshots/patientD3.png">
</details>

<details>
<summary><h3>Pharmacist</h3></summary>

<img width="1000" alt="login" src="./screenshots/pharmacist/home.png">
<img width="1000" alt="login" src="./screenshots/pharmacist/inventory.png">
<img width="1000" alt="login" src="./screenshots/pharmacist/salesReport.png">
<img width="1000" alt="login" src="./screenshots/pharmacist/pharmacistNotifcations.png">
<img width="1000" alt="login" src="./screenshots/pharmacist/doctors.png">
<img width="1000" alt="login" src="./screenshots/pharmacist/pharmacistChat.png">
<img width="1000" alt="login" src="./screenshots/pharmacist/pharmacistSettings.png">
</details>

<details>
<summary><h3>Admin</h3></summary>
<img width="1000" alt="login" src="./screenshots/viewPharmacist.png">
</details>

## Tech Stack

<div align="center" >
   
[![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)](https://www.javascript.com)
[![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://html.com/html5/)
![Redux](https://img.shields.io/badge/Built%20with-Redux-%23f44336?style=for-the-badge)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
[![Nodejs](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/en/)
[![ExpressJs](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://GitHub.com/Naereen/badges/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)](https://github.com/omar-sherif9992)
![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)
![Tailwind](https://img.shields.io/badge/tailwindcss-0F172A?&logo=tailwindcss)

</div>

- **Backend**: Node.js, Express, Mongoose, Socket.io, Nodemailer
- **Frontend**: React.js, Material-UI, Ant ,Redux , Socket.io, Tailwind
- **Database**: MongoDB
- **Authentication**: JWT
- **APIs**: Stripe
- **Development tools**: Postman, Git, GitHub

## Features

<details>
<summary>As a Guest I can</summary>

- Register as a patient with my username, name, email, password, date of birth, gender, mobile number, and emergency contact details.
- Submit a request to register as a pharmacist with my username, name, email, password, date of birth, hourly rate, hospital affiliation, and educational background.

</details>

<details>
<summary>As a Patient I can</summary>

- View a list of all available medicines, including pictures, prices, and descriptions.
- Search for medicines based on name.
- Filter medicines based on their medicinal use.
- Add over-the-counter medicines to my cart.
- Add prescription medicines to my cart based on my prescription.
- View items in my cart.
- Remove items from my cart.
- Change the quantity of items in my cart.
- Checkout my order.
- Add new delivery addresses and choose from existing ones.
- Select payment methods including wallet, credit card, or cash on delivery.
- View my current and past orders along with their details and status.
- Cancel orders.
- View alternatives to medicines that are out of stock.
- Chat with a pharmacist.
- View the amount in my wallet.

</details>

<details>
<summary>As a Pharmacist I can</summary>

- Upload and submit required documents for registration such as ID, pharmacy degree, and working licenses.
- view a list of all available medicines (including picture of medicine, price, description)
- search for medicine based on name
- filter medicines based on medicinal use
- Add a medicine with its details like active ingredients, price, and quantity.
- Upload images for medicines.
- Edit details and prices of medicines.
- Archive or unarchive a medicine.
- View the available quantity and sales of each medicine.
- Filter sales reports based on medicine or date.
- Receive notifications when a medicine is out of stock.
- Chat with a doctor.
- View total sales reports based on a chosen month.
- View the amount in my wallet.

</details>

<details>
<summary>As an Administrator I can</summary>

- Add another administrator with a set username and password.
- Remove a pharmacist or patient from the system.
- View all the information uploaded by a pharmacist when they apply to join the platform.
- Accept or reject the request of a pharmacist to join the platform.
- View total sales reports based on a chosen month.
- View a pharmacist's information.
- View a patient's basic information.
- Change my password.
- Reset my password via OTP sent to email.
- view a list of all available medicines (including picture of medicine, price, description)
- search for medicine based on name
- filter medicines based on medicinal use

</details>

<details>
<summary>Common Features for Patient/Pharmacist/Administrator</summary>
   
- Login with my username and password.
- Logout of the system.
- Change my password.
- Reset my password via OTP sent to email.
- View a list of all available medicines including picture, price, and description.
- Search for medicine based on name.
- Filter medicines based on medicinal use.

</details>

## Code Examples

<details>
    <summary>
    Stripe Controller
    </summary>

```javascript
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-08-01",
});

const createPaymentIntent = async (req, res) => {
  try {
    const { amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: parseInt(amount),
      currency: "usd",
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const config = (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
};

module.exports = {
  createPaymentIntent,
  config,
};
```

</details>

<details>
    
<summary>Medicine Model</summary>

```javascript
const mongoose = require("mongoose");
const { Schema } = mongoose;

const medicineSchema = new Schema({
  name: String,
  description: String,
  activeIngredients: [String],
  price: Number,
  quantity: Number,
  medicineImage: {
    data: Buffer,
    contentType: String,
  },
  sales: {
    type: Number,
    default: 0,
  },
  medicinalUse: {
    type: String,
    enum: [
      "Antibiotic",
      "Pain Reliever",
      "Antipyretic",
      "Antifungal",
      "Antiviral",
      "Antiseptic",
      "Antispasmodic",
      "Antihistamine",
      "Anti-inflammatory",
      "Diuretic",
    ],
  },
  status: {
    type: String,
    enum: ["archived", "unarchived"],
    default: "unarchived",
  },
  isOverTheCounter: {
    type: Boolean,
    default: false,
  },
});

const Medicine = mongoose.model("Medicine", medicineSchema);
module.exports = Medicine;
```

</details>

<details>

<summary>
    Patient Routes
</summary>

```javascript
const express = require("express");
const router = express.Router();
const {
  getMedicines,
  getPatient,
  getOrders,
  cancelOrder,
  createOrder,
  removeFromCart,
  addToCart,
  addDeliveryAddress,
  payByWallet,
  changePassword,
  viewWallet,
  viewAlternatives,
  linkWithClinic,
  updatePrescriptionsQuantity,
} = require("../controller/patientController");

const authorize = require("../middlewares/authorization");

router.get("/", authorize, getPatient); //done

router.get("/medicines", authorize, getMedicines); //done

router.post("/addToCart", authorize, addToCart); //done

router.delete(`/removeFromCart`, authorize, removeFromCart); //done

router.get("/orders", authorize, getOrders); //done

router.patch("/cancelOrder", authorize, cancelOrder); //done

router.post("/createOrder", authorize, createOrder); //done

router.patch("/addDeliveryAddress", authorize, addDeliveryAddress); //done

router.patch("/deliveryAddress", authorize, addDeliveryAddress);

router.patch("/payByWallet", authorize, payByWallet); //done

router.patch("/changePassword", authorize, changePassword);

router.get("/wallet", authorize, viewWallet);

router.get("/alternatives", authorize, viewAlternatives);

router.post("/linkWithClinic", authorize, linkWithClinic);

router.patch("/updatePrescriptionsQuantity", authorize, updatePrescriptionsQuantity);

module.exports = router;
```

</details>

<details>
    <summary>
        Authorization middleware
    </summary>

```javascript
const jwt = require("jsonwebtoken");

const authToken = (req, res, next) => {
  const token = req.cookies.jwt;
  console.log(token);
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, userData) => {
      if (err) return res.status(500).json({ message: "Unauthorized", isLoggedIn: false });

      req.userData = userData; //userData is the payload included in the token
      const userType = userData.userType;
      //check if the user type allowed for the current route
      console.log("baseUrl", req.baseUrl);
      if (userType === "admin" && req.baseUrl.includes("/admin")) next();
      else if (userType === "pharmacist" && req.baseUrl.includes("/pharmacist")) next();
      else if (
        userType === "patient" &&
        (req.baseUrl.includes("/patient") || req.baseUrl.includes("/stripe"))
      )
        next();
      else return res.status(403).json({ message: "Forbidden" });
    });
  } else {
    res.status(500).json({ message: "Unauthorized", isLoggedIn: false });
  }
};

module.exports = authToken;
```

</details>

<details>

   <summary>
        Login Form
   </summary> 
   
```javascript
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
{isLoading ? (
<LoadingIndicator />
) : (
<Button type='submit'>Log in</Button>
)}
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
          }} >
<button
className='forget-password-button'
onClick={() => {
navigate("/registerPharmacist");
}} >
Register as Pharmacist?
</button>
<button
className='forget-password-button'
onClick={() => {
navigate("/registerPatient");
}} >
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

password: yup
.string()
.min(8, "Password must be at least 8 characters long")
.matches(/[a-zA-Z]/, "Password must contain at least one letter")
.matches(/[0-9]/, "Password must contain at least one number")
.required("Please enter a valid password"),
});

const initialPharmacistValues = {
username: "",
password: "",
};

export default LoginForm;

````

</details>




## Installation

### Clone the repository:

```bash
git clone https://github.com/advanced-computer-lab-2023/Abo-Mota-Pharmacy.git
cd Abo-Mota-Pharmacy
````

### Install client dependencies

```bash
cd client
npm install
```

### Install server dependencies

```bash
  cd backend
  npm install
```

## API Reference

<details>
   <summary><h3>Common Routes (Notifications and Messages)</h1></summary>

#### Get Notifications

- **Endpoint**: `GET /api/common/notifications`
- **Description**: Retrieves notifications for a user.
- **Controller**: `getNotifications`
  - Retrieves all notifications for a user.

#### Send Notification

- **Endpoint**: `POST /api/common/notification`
- **Description**: Sends a new notification.
- **Controller**: `sendNotification`
  - Creates and sends notifications to specified recipients.
- **Body Parameters**:
  | Parameter | Type |Description |
  |-------------------|--------|---------------------------|
  | `recipientUsername`| string | Recipient's username |
  | `recipientType` | string | Recipient's user type |
  | `content` | string | Notification content |

#### Send Email Notification

- **Endpoint**: `POST /api/common/send-email`
- **Description**: Sends an email notification.
- **Controller**: `sendEmailNotif`
  - Sends email notifications using external email service.
- **Body Parameters**:
  | Parameter | Type | Description |
  |--------------|--------|---------------------------|
  | `email` | string | Recipient email address |
  | `subject` | string | Email subject |
  | `text` | string | Email body text |

</details>

<details>
   <summary><h3>Stripe Routes</h3></summary>
   
   #### Get Configurations
- **Endpoint**: `GET /api/stripe/config`
- **Description**: Retrieves Stripe configuration details.
- **Controller**: `config`
  - Returns Stripe publishable key.

#### Create Payment Intent

- **Endpoint**: `POST /api/stripe/create-payment-intent`
- **Description**: Creates a new payment intent for Stripe transactions.
- **Controller**: `createPaymentIntent`
  - Stripe Payment Intent Creation.
- **Body Parameters**:
  | Parameter | Type | Description |
  |---------------|--------|---------------------------|
  | `amount` | number | Transaction amount in USD |

</details>
<details>
   <summary><h3>Guest Routes</h3></summary>
   
#### Register Patient
- **Endpoint**: `POST /pharmaApi/guest/registerPatient`
- **Description**: Registers a patient to the pharmacy platform
- **Controller**: `registerPatient`
  - Adds a new patient to the database
- **Body Parameters**:
| Parameter   | Type   | Description    |
  |-------------|--------|----------------|
  | `name`      | string | Patient's name |
  | `username`  | string | User's username|
  | `nationalId`| string | National ID    |
  | `password`  | string | Account password|
  | `email`     | string | Email address  |
  | `dob`       | date   | Date of Birth  |
  | `mobile`    | number | Phone Number |
  | `gender`    | string | Gender (male or female) |
   | `emergencyContact.name`        | string | Emergency contact's name       |
  | `emergencyContact.mobile`      | string | Emergency contact's mobile     |
  | `emergencyContact.relation`    | string | Relation to emergency contact  |

#### Register Pharmacist

- **Endpoint**: `POST /pharmaApi/guest/registerPharmacist`
- **Description**: Registers a pharmacist to await approval on the platform
- **Controller**: `registerPharmacist`
  - Creates a new pharmacist awaiting approval by an admin
- **Body Parameters**:
- **Body Parameters**:
  | Parameter | Type | Description |
  |-------------|--------|-------------------|
  | `name` | string | Pharmacist's name |
  | `username` | string | User's username |
  | `nationalId`| file | National ID file |
  | `password` | string | Account password|
  | `email` | string | Email address |
  | `dob` | date | Date of Birth |
  | `educationalBackground` | string | Educational Background|
  | `affiliation` | string | Affiliation of Dr. |
  | `mobile` | number | Phone Number |
  | `gender` | string | Gender (male or female) |
  | `workingLicense`| file| Working license file|
  | `pharmacyDegree`| file | Pharmacy degree file|

#### Login

- **Endpoint**: `POST /pharmaApi/guest/login`
- **Description**: Logs in a registered patient/pharmacist/admin
- **Controller**: `login`
  - Logs in user and redirects to correct page, creates JWT authorization token
- **Body Parameters**:
  | Parameter | Type | Description |
  |-------------|--------|-------------------|
  | `username` | string | Account username |
  | `password` | string | Account password |

#### Logout

- **Endpoint**: `POST /pharmaApi/guest/logout`
- **Description**: Logs out currently logged in user
- **Controller**: `logout`
  - Logs out currently logged in user and destroys JWT token

#### Request OTP

- **Endpoint**: `POST /pharmaApi/guest/otp`
- **Description**: Requests an OTP to be sent to a given email to reset password
- **Controller**: `requestOtp`
  - Sends an email containing an OTP to the requesting user
- **Body Parameters**:
  | Parameter | Type | Description |
  |-------------|--------|-------------------|
  | `email` | string | Account email |

#### Forgot Password

- **Endpoint**: `/pharmaApi/guest/forgotPassword`
- **Description**: Changes password using previously sent otp
- **Controller**: `forgotPassword`
  - Resets password using sent OTP
- **Body Parameters**:
  | Parameter | Type | Description |
  |-------------|--------|-------------------|
  | `email` | string | Account email |
  | `otp` | string | OTP received on email |
  | `newPassword` | string | New password |

</details>
<details>
   <summary>
      <h3>
         Pharmacist Routes
      </h3>
   </summary>
   
#### Add Medicine
- **Endpoint**: `POST /pharmaApi/pharmacist/medicine`

- **Description**: Creates a new medicine record.
- **Controller**: `addMedicine`

  - Adds new medicine details to the database.

- **Body Parameters**:
  | Parameter | Type | Description |
  |---------------------|--------|-----------------------------------|
  | `name` | string | Medicine name |
  | `description` | string | Description |
  | `price` | number | Price |
  | `activeIngredients` | string | Active ingredients |
  | `quantity` | number | Quantity available |
  | `medicinalUse` | string | Medicinal use |
  | `isOverTheCounter` | boolean| Availability over the counter |
  | `medicineImage` | file | Image of the medicine |

#### Edit Medicine

- **Endpoint**: `PATCH /pharmaApi/pharmacist/medicine/:name`
- **Description**: Modifies a medicine record.
- **Controller**: `editMedicine`
  - Updates existing medicine details.
- **Path Parameters (Params)**:
  | Parameter | Type | Description |
  |---------------------|--------|-----------------------------------|
  | `name` | string | Medicine name to update |

- **Body Parameters**:
  | Parameter | Type | Description |
  |---------------------|--------|-----------------------------------|
  | `name` | string | Medicine name |
  | `description` | string | Description |
  | `price` | number | Price |
  | `activeIngredients` | string | Active ingredients |
  | `quantity` | number | Quantity available |
  | `medicinalUse` | string | Medicinal use |
  | `isOverTheCounter` | boolean| Availability over the counter |
  | `medicineImage` | file | Image of the medicine|

#### Get Sales Reports

- **Endpoint**: `GET /pharmaApi/pharmacist/salesReport`
- **Description**: Retrieves sales reports data grouped together by the same date (day/month/year).
- **Controller**: `getSalesReports`
  - Generates sales reports for medicines.

#### Change Password

- **Endpoint**: `PATCH /pharmaApi/pharmacist/changePassword`
- **Description**: Updates pharmacist's password.
- **Controller**: `changePassword`
  - Allows pharmacists to change their password.
- **Body Parameters**:
  | Parameter | Type | Description |
  |---------------------|--------|-----------------------------------|
  `oldPassword` | string | Old password of current pharmacist
  | `newPassword` | string | New password of current pharmacist |

#### View Wallet

- **Endpoint**: `GET /pharmaApi/pharmacist/wallet`
- **Description**: Retrieves wallet information.
- **Controller**: `viewWallet`
  - Displays current wallet balance for a pharmacist.

#### Archive Medicine

- **Endpoint**: `PATCH /pharmaApi/pharmacist/archive`
- **Description**: Changes medicine status to archived.
- **Controller**: `archiveMedicine`
  - Archives a specific medicine.
- **Body Parameters**:
  | Parameter | Type | Description |
  |---------------------|--------|-----------------------------------|
  `medicineName` | string | Archives a medicine

#### Unarchive Medicine

- **Endpoint**: `PATCH /pharmaApi/pharmacist/unarchive`
- **Description**: Changes medicine status to unarchived.
- **Controller**: `unarchiveMedicine`
  - Reverts archive status of a medicine.
- **Body Parameters**:
| Parameter | Type | Description |
|---------------------|--------|-----------------------------------|
`medicineName` | string | Unarchives a medicine
</details>
<details>
   <summary><h3>Patient Routes </h1></summary>

#### Get Logged In Patient

- **Endpoint**: `GET /pharmaApi/patient`
- **Description**: Retrieves logged in patient information
- **Controller**: `getPatient`
  - Fetches logged in patient's account object

#### Get All Medicines

- **Endpoint**: `GET /pharmaApi/patient/medicines`
- **Description**: Retrieves a list of all available medicines in the pharmacy
- **Controller**: `getMedicines`
  - Fetches and returns a list of all medicines from the database

#### Get All Pharmacists

- **Endpoint**: `GET /pharmaApi/patient/pharmacists`
- **Description**: Provides information about all pharmacists associated with the pharmacy
- **Controller**: `getPharmacists`
  - Gathers and returns data about all pharmacists, including their qualifications and availability

#### Add to Cart

- **Endpoint**: `POST /pharmaApi/patient/addToCart`
- **Description**: Allows the logged-in patient to add a specific medicine to their cart
- **Controller**: `addToCart`
  - Processes the request to add a specified medicine to the patient’s cart
- **Body Parameters**:
  | Parameter | Type | Description |
  |-----------|--------|------------------------------|
  | `name` | string | Name of the medicine to add |
  | `quantity`| number | Quantity of the medicine |

#### Remove from Cart

- **Endpoint**: `DELETE /pharmaApi/patient/removeFromCart`
- **Description**: Enables the removal of a specific medicine from the patient's cart
- **Controller**: `removeFromCart`
  - Handles the deletion of a selected medicine from the patient’s cart
- **Path Parameters**:
  | Parameter | Type | Description |
  |-----------|--------|------------------------------|
  | `name` | string | Name of the medicine |
  | `quantity`| number | Quantity of the medicine |

#### Get All Orders

- **Endpoint**: `GET /pharmaApi/patient/orders`
- **Description**: Retrieves a history of all orders made by the logged-in patient
- **Controller**: `getOrders`
  - Fetches and returns a list of all orders placed by the patient

#### Cancel Order

- **Endpoint**: `PATCH /pharmaApi/patient/cancelOrder`
- **Description**: Allows a patient to cancel an order
- **Controller**: `cancelOrder`
  - Handles the cancellation of an existing order
- **Body Parameters**:
  | Parameter | Type | Description |
  |-----------|--------|-------------------------------|
  | `orderId` | string | Unique identifier of the order|

#### Create Order

- **Endpoint**: `POST /pharmaApi/patient/createOrder`
- **Description**: Allows patients to create a new order for medicines
- **Controller**: `createOrder`
  - Calculates the total price of the order and updates the medicine stock
- **Body Parameters**:
  | Parameter | Type | Description |
  |------------|--------|--------------------------------------|
  | `medicines`| array | An array of medicine objects |

#### Add Delivery Address

- **Endpoint**: `PATCH /pharmaApi/patient/addDeliveryAddress`
- **Description**: Allows patients to add a new delivery address to their profile
- **Controller**: `addDeliveryAddress`
  - Adds the new address to the patient's profile
- **Body Parameters**:
  | Parameter | Type | Description |
  |------------------|--------|----------------------------|
  | `apartmentNumber`| string | Apartment number of address|
  | `streetName` | string | Street name of address |
  | `city` | string | City of the address |

#### Pay By Wallet

- **Endpoint**: `PATCH /pharmaApi/patient/payByWallet`
- **Description**: Allows patients to make payments using their wallet balance
- **Controller**: `payByWallet`
  - Deducts the specified amount from the patient's wallet
- **Body Parameters**:
  | Parameter | Type | Description |
  |-------------|--------|-----------------------------|
  | `deductible`| number | Amount to be deducted |

#### Change Password

- **Endpoint**: `PATCH /pharmaApi/patient/changePassword`
- **Description**: Allows patients to change their account password
- **Controller**: `changePassword`
  - Verifies old password and updates to a new password
- **Body Parameters**:
  | Parameter | Type | Description |
  |--------------|--------|----------------------|
  | `oldPassword`| string | Current password |
  | `newPassword`| string | New password |

#### View Wallet

- **Endpoint**: `GET /pharmaApi/patient/wallet`
- **Description**: Provides the logged-in patient with the current balance in their wallet
- **Controller**: `viewWallet`
  - Retrieves and displays the wallet balance of the logged-in patient

#### View Alternatives

- **Endpoint**: `GET /pharmaApi/patient/alternatives`
- **Description**: Provides patients with alternative medicine options based on the active ingredient of a specified medicine
- **Controller**: `viewAlternatives`
  - Identifies alternatives with the same primary active ingredient as the specified medicine
- **Body Parameters**:
  | Parameter | Type | Description |
  |---------------|--------|-----------------------------------------------|
  | `medicineName`| string | The name of the medicine to find alternatives for |

#### Link with Clinic

- **Endpoint**: `POST /pharmaApi/patient/linkWithClinic`
- **Description**: Allows patients to link their pharmacy account with their clinic profile for integrated care
- **Controller**: `linkWithClinic`
  - Validates clinic patient credentials and links the pharmacy and clinic patient accounts
- **Body Parameters**:
  | Parameter | Type | Description |
  |-----------|--------|---------------------------------|
  | `username`| string | Username of the clinic patient |
  | `password`| string | Password of the clinic patient |

#### Update Prescriptions Quantity

- **Endpoint**: `PATCH /pharmaApi/patient/updatePrescriptionsQuantity`
- **Description**: Adjusts the quantity of a specific medicine in a patient's prescription
- **Controller**: `updatePrescriptionsQuantity`
  - Updates the quantity of a specified medicine in the prescription
- **Body Parameters**:
  | Parameter | Type | Description |
  |----------------|--------|---------------------------------------------------|
  | `prescriptionId`| string | ID of the prescription to be updated |
  | `medicineId` | string | ID of the medicine in the prescription to update |

</details>

<details>
   <summary>
      <h3>Admin Routes</h3>
   </summary>

#### Get Pharmacists

- **Endpoint**: `GET /pharmaApi/admin/pharmacists`
- **Description**: Fetches list of approved pharmacists.
- **Controller**: `getPharmacists`
  - Retrieves all approved pharmacists.

#### Get Pharmacist by ID

- **Endpoint**: `GET /pharmaApi/admin/pharmacists/:id`
- **Description**: Retrieves pharmacist details.
- **Controller**: `getPharmacist`
  - Fetches details of a specific pharmacist.
- **Path Parameters (Params)**:
  | Parameter | Type | Description |
  |-----------|--------|--------------------------|
  | `id` | string | Pharmacist identifier |

#### Add Admin

- **Endpoint**: `POST /pharmaApi/admin/admins`
- **Description**: Registers a new admin.
- **Controller**: `addAdmin`
  - Creates a new admin account.
- **Body Parameters**:
  | Parameter | Type | Description |
  |-----------|--------|----------------------|
  | `username`| string | Admin's username |
  | `password`| string | Admin's password |
  | `email` | string | Admin's email |

#### Delete Patient

- **Endpoint**: `DELETE /pharmaApi/admin/patients`
- **Description**: Deletes a patient account.
- **Controller**: `deletePatient`
  - Removes a specific patient.
- **Body Parameters**:
  | Parameter | Type | Description |
  |-----------|--------|----------------------|
  | `username`| string | Admin's username |

#### Delete Pharmacist

- **Endpoint**: `DELETE /pharmaApi/admin/pharmacists`
- **Description**: Deletes an approved pharmacist account.
- **Controller**: `deletePharmacist`
  - Removes a specific approved pharmacist.
- **Body Parameters**:
  | Parameter | Type | Description |
  |-----------|--------|----------------------|
  | `username`| string | Admin's username |

#### Change Password

- **Endpoint**: `PATCH /pharmaApi/admin/changePassword`
- **Description**: Changes user's password.
- **Controller**: `changePassword`
  - Allows user to update their password.
- **Body Parameters**:
  | Parameter | Type | Description |
  |-----------|--------|----------------------|
  | `oldPassword`| string | Current admin's old password |
  | `newPassword`| string | Current admin's new password |

#### Get Admin Details

- **Endpoint**: `GET /pharmaApi/admin/admin`
- **Description**: Fetches admin information.
- **Controller**: `getAdmin`
  - Retrieves details of the logged-in admin.

#### Get Medicines

- **Endpoint**: `GET /pharmaApi/admin/medicines`
- **Description**: Retrieve all medicines on the platform
- **Controller**: `getMedicines`
  - Returns a list of all medicines available on the platform

#### Get Applications

- **Endpoint**: `GET /pharmaApi/admin/applications`
- **Description**: Retrieve a list of all pending pharmacist applications
- **Controller**: `getApplications`
  - Returns a list of all applications of pharmacists that are pending on the database

#### Handle Application

- **Endpoint**: `PATCH /pharmaApi/admin/applications/:id`
- **Description**: Approves or rejects a specific pharmacist application
- **Controller**: `handleApplication`
  - Rejects or accepts a pharmacist's application
- **Path Parameters (Params)**:
  | Parameter | Type | Description |
  |-------------|--------|-------------------|
  | `id` | string | Pharmacist ObjectId |
- **Body Parameters**:
  | Parameter | Type | Description |
  |-------------|--------|-------------------|
  | `registrationStatus` | string | Admin verdict, either "approved" or "rejected" |

#### Get Patients

- **Endpoint**: `GET /pharmaApi/admin/patients`
- **Description**: Retrieves all patients on the platform
- **Controller**: `getPatients`
  - Returns an array of all patients in the pharmacy database

#### Get Patient

- **Endpoint**: `GET /pharmaApi/admin/patients/:id`
- **Description**: Retrieves a specific patient on the platform
- **Controller**: `getPatient`
  - Returns a specified patient depending on id in params
- **Path Parameters (Params)**:
| Parameter | Type | Description |
|-------------|--------|-------------------|
| `id` | string | Patient ObjectId |
</details>

## Testing

The testing is done using `Postman`.

<details>

<summary>
   Example Testing get Medicines
</summary>

```javascript


pm.test("Response status code is 200", function () {
    pm.expect(pm.response.code).to.equal(200);
});


pm.test("Price should be a non-negative number", function () {
    const responseData = pm.response.json();

    responseData.forEach(function(medicine) {
…        pm.expect(item.quantity).to.be.a('number').and.to.be.at.least(0);
    });
});



```

</details>

<details>

<summary>
   Example Testing Login
</summary>

```javascript


pm.test("Response status code is 200", function () {
  pm.expect(pm.response.code).to.equal(200);
});


pm.test("Response has the required fields - message, token, and userType", function () {
  const responseData = pm.response.json();

  pm.expect(responseData).to.be.an('object');
…  }, "UserType should be a valid type");
});


pm.test("Content-Type header is application/json", function () {
    pm.expect(pm.response.headers.get("Content-Type")).to.include("application/json");
});


```

</details>

<details>
   <summary>
      Example Testing Get Sales Report
   </summary>

```javascript
pm.test("Response status code is 200", function () {
  pm.expect(pm.response.code).to.equal(200);
});

pm.test("Content-Type header is application/json", function () {
  pm.expect(pm.response.headers.get("Content-Type")).to.include("application/json");
});

pm.test("Ensure purchaseDate is in a valid date format", function () {
  const responseData = pm.response.json();

  pm.expect(responseData).to.be.an("array");
  responseData.forEach(function (item) {
    pm.expect(item.purchaseDate).to.match(/^\d{4}-\d{2}-\d{2}$/);
  });
});

pm.test("Sales field is a non-negative integer", function () {
  const responseData = pm.response.json();

  pm.expect(responseData).to.be.an("array");
  responseData.forEach(function (item) {
    pm.expect(item.sales).to.be.a("number");
    pm.expect(item.sales).to.be.at.least(0);
  });
});
```

</details>

## How to use

#### Start the client:

```bash
cd client
cd src
npm start
```

The client server will run on http://localhost:3000.

#### Start the server:

```bash
cd backend
nodemon index.js
```

## Contributing

Contributions are always welcome!

See `contributing.md` for ways to get started.

Please adhere to this project's `code of conduct`.

## Credits

- [Mongoose docs](https://mongoosejs.com/docs/)
- [MongoDB docs](https://www.mongodb.com/)
- [Express docs](https://expressjs.com/en/4x/api.html)
- [ReactJs docs](https://reactjs.org/docs/getting-started.html)
- [Redux docs](https://redux.js.org/api/api-reference)
- [NodeJs docs](https://nodejs.org/en/docs/)
- [Ant Design website](https://ant.design/)
- [Material UI website](https://mui.com/)
- [Stripe docs](https://stripe.com/docs/)
- [MERN Youtube](https://www.youtube.com/channel/UC29ju8bIPH5as8OGnQzwJyA)
- [Stripe Youtube](https://youtu.be/1r-F3FIONl8)
- [JWT](https://www.youtube.com/watch?v=mbsmsi7l3r4)
- [Sockets.io docs](https://socket.io/)
- [Tailwind docs](https://tailwindcss.com/docs/)
- [Formik docs](https://formik.org/docs/tutorial)
- [React pro sidebar](https://www.npmjs.com/package/react-pro-sidebar)
- [React Router](https://reactrouter.com/en/main)

## License

Portions of this software utilize Stripe, which is licensed under the Apache License 2.0. You can find the details of this license [here](https://www.apache.org/licenses/LICENSE-2.0).

The rest of the software is open source and licensed under the [GNU General Public License v3.0](https://choosealicense.com/licenses/gpl-3.0/).
