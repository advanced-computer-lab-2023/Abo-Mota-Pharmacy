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
The technology stack for the pharmacy module includes:
- **Backend**: Node.js with Express
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
The API server will run on http://localhost:3000.
## Start the server:
 ```bash
cd backend
nodemon index.js
 ```

Open your browser and navigate to http://localhost:3000 to access the simulator.

## API Reference

API documentation is available at `/api/docs`, which provides a comprehensive guide to the endpoints and their usage.

## How to Use?

## Contribute

We welcome contributions that help enhance the features and functionalities of the Pharmacy Management System. Please refer to the contribution guidelines for the process and standards we follow.

## Credits



## License


