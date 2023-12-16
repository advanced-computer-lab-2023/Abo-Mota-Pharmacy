<div id="top"></div>





<!-- badges -->
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

<br>

<div align="center>
   <img src="[https://www.cancham.org.eg/upload/logo.png](https://i.pinimg.com/736x/6c/9b/30/6c9b3009988b071b4b60484622e93f17.jpg)" alt="Logo" width="200" height="120">   
</div>


<a href=""><h1 align="center">Welcome to Abo Mota Pharmacy</h1></a>


# Pharmacy Management System - Virtual Clinic

## Project Title

Pharmacy Management Module of Virtual Clinic - Seamless Healthcare and Medication Management

## Motivation

The Pharmacy Management Module is a vital component of the Virtual Clinic, aimed at streamlining the process of medication management. It facilitates a secure and efficient interface for patients to purchase medicines and pharmacists to manage inventory, ultimately enhancing the healthcare experience for all users.

## Build Status

Currently, the pharmacy module is in the beta stage, with primary features deployed for testing. Ongoing efforts are focused on improving functionality and addressing user feedback.

## Code Style

We follow the "standard" coding style to ensure our code is clean and consistent. Contributions are expected to adhere to this style guide to maintain code quality.

## Screenshots

*Images showcasing the interface and functionality of the pharmacy module will be placed here.*

## Tech/Framework Used

![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
![Redux](https://img.shields.io/badge/Built%20with-Redux-%23f44336?style=for-the-badge)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

The technology stack for the pharmacy module includes:
- **Backend**:
  -
- **Database**: MongoDB for data storage
- **Frontend**: React.js with Redux for state management
- **Authentication**: JWT for session security
- **Payment Processing**: Stripe for secure financial transactions

## Features

- **Guests** can register as a patient or pharmacist, providing comprehensive personal and professional details.
- **Users** can easily login and logout using their credentials to ensure security and privacy.
- **Administrators** have the ability to manage user accounts and oversee pharmacist verification processes.
- **Pharmacists** are enabled to upload necessary documentation for verification and manage medicine inventories.
- **Patients** have functionalities tailored to their needs, from viewing and managing cart items to checking out orders and handling prescriptions.
- **Order Management**: Patients can handle their orders, including adding new delivery addresses, choosing payment methods, and viewing order histories.
- **Medicine Management**: Pharmacists can add new medicines, update details, and archive/unarchive medicines to ensure up-to-date inventory management.
- **Reporting**: Pharmacists and administrators can generate and filter sales reports for efficient business tracking.
- **Communication**: Patients and pharmacists can engage in chats, enhancing the consultation process.
- **Notifications**: Pharmacists receive alerts when medicines are out of stock, ensuring timely restocking.

## Detailed Features

1. **Account Registration and Management**
   - Register with detailed personal information.
   - Submit requests for pharmacist registration with professional credentials.
   - Change and reset passwords securely, adhering to stringent validation rules.

2. **Medicine Inventory Management**
   - View and manage available medicines with detailed descriptions.
   - Search and filter medicines based on various criteria.
   - Add, edit, and manage medicine details and images.

3. **Sales and Reporting**
   - Access sales reports and filter based on specific criteria.
   - Archive medicines to maintain sales history.

4. **Shopping Cart and Orders**
   - Add over-the-counter and prescription medicines to the cart.
   - View, modify, and checkout cart items.
   - Manage delivery addresses and payment options.

5. **User Interaction**
   - Chat with pharmacists and doctors for guidance.
   - View wallet balance and transaction history.

6. **Notifications**
   - Receive notifications for medicine stock levels.

## Comments and Security Measures

- Passwords must follow specific validation criteria.
- Prescription medicines can only be added based on recent prescriptions.
- Sales information of medicines is retained for reference even after archiving.
- Patient privacy is safeguarded by restricting administrator access to prescription details.

## Code Examples

*Code snippets highlighting key functionalities and usage will be provided here.*

### Installation

Clone the repository:

   ```bash
   git clone https://github.com/advanced-computer-lab-2023/Abo-Mota-Pharmacy.git
   cd Abo-Mota-Pharmacy
   ```
   
# Install client dependencies

  ```bash
  cd client
  npm install
```
# Install server dependencies
  ```bash
    cd backend
    npm install
```
# Running the Application
## Start the client:
 ```bash
cd client
cd src
npm start
```
The client server will run on http://localhost:3000.
## Start the server:
 ```bash
cd backend
nodemon index.js
 ```

Open your browser and navigate to http://localhost:3000 to access the simulator.

## How to Use

This guide will help you understand how to navigate and utilize the features of the Pharmacy Management Module of Virtual Clinic.

### For Patients

1. **Register/Login**: Access the Virtual Clinic and create a new patient account or log in with your existing credentials.

2. **Browse Medicines**: Navigate to the 'Medicines' section to browse through the available medications. You can use filters to search for specific drugs or categories.

3. **Add to Cart**: Once you find the medicine you need, add it to your cart. You can adjust the quantity before adding.

4. **Checkout**: Go to your cart, review your order, and proceed to checkout. Enter your delivery information and select a payment method.

5. **Track Orders**: After placing your order, you can track its status under the 'My Orders' section. You will receive updates on the progress of your order until delivery.

6. **Consultation**: If you need advice, use the chat feature to talk to a pharmacist or healthcare provider.

### For Pharmacists

1. **Register/Login**: Sign up as a pharmacist or log in. Ensure you provide all required professional information and documents.

2. **Manage Inventory**: Go to the 'Inventory' section to add new medicines, update existing ones, or manage stock levels.

3. **Process Orders**: Check the 'Orders' tab to view incoming orders. Process them promptly and update the order status accordingly.

4. **Reporting**: Use the reporting features to generate sales and inventory reports for analysis and restocking purposes.

5. **Customer Interaction**: Respond to patient queries through the chat feature, providing professional advice and support.

### For Administrators

1. **User Management**: Oversee user accounts, verify pharmacist credentials, and manage access levels.

2. **Reporting**: Generate comprehensive reports to monitor sales and inventory, and make informed decisions.

3. **System Settings**: Update system settings to ensure the smooth operation of the pharmacy module, including payment options and notification settings.

4. **Support**: Provide support to users and address any system-related issues they may encounter.

### Additional Tips

- Make sure your account details are up-to-date for seamless communication and transactions.
- Always log out of your account after you have finished using the system to maintain security.
- If you encounter any issues, refer to the 'Help' section or contact support for assistance.
## API Refrences 

## Tests

## Contribute

We welcome contributions that help enhance the features and functionalities of the Pharmacy Management System. Please refer to the contribution guidelines for the process and standards we follow.

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


## License
- The software is open source under the Apache 2.0 License.

- The Stripe is licensed under the Apache License 2.0

