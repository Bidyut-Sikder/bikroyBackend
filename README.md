# BikroyBackend

BikroyBackend is an online backend  helps users buy and sell a wide variety of products. It operates as a classified ads platform, allowing individuals and businesses to post listings for items such as electronics, vehicles, real estate, jobs, and household goods.

## Features

### Buy & Sell
- The platform follows a simple peer-to-peer (P2P) model.
- Enables direct communication between buyers and sellers without intermediaries.

### User Profiles
- Allows users to create, edit, and personalize profiles.
- Users can manage their products as needed.

### Community Interaction
- Users can contact sellers via phone calls or chat messages.
- Individual buyers & sellers do not have a rating system.
- Verified businesses can receive reviews & feedback.

## Technologies Used
- **Backend**: Express.js, Node.js
- **Database**: MongoDB, Mongoose
- **Security**: Helmet, Express-Mongo-Sanitize, Express-Rate-Limit, HPP
- **Other Dependencies**: Axios, Bcrypt.js, JSON Web Token, Cookie-Parser, Cors, Multer, Nodemailer, Validator

## Installation

### Prerequisites
Ensure you have the following installed:
- Node.js (>= 14)
- npm (>= 6) or yarn
- MongoDB (if running locally)

### Setup Instructions

1. Clone the repository:
   ```sh
   git clone https://github.com/Bidyut-Sikder/bikroyBackend
   ```
2. Navigate to the project directory:
   ```sh
   cd gadget-galaxy
   ```
3. Install dependencies:
   ```sh
   npm install
   ```

### Environment Variables
Create a `.env` file in the root directory and configure the following:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```

### Running the Development Server
Start the server with Nodemon:
```sh
npm run start
```
The backend server will run on `http://localhost:5000/`.


## Contributing
Contributions are welcome! Follow these steps:
1. Fork the repository.
2. Create a new branch (`feature/your-feature`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## License
This project is licensed under the MIT License.

## Contact
For any inquiries, contact [your-email@example.com](mailto:your-email@example.com).


















