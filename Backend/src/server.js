const express = require('express');
const app = express();

// Middleware to parse JSON bodies (This should come before route handling)
app.use(express.json());

// Import the user route from your routes directory
const userRoutes = require('./routes/user');

// Define the /user route
app.use('/user', userRoutes);

// Root route for testing
app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

// Database connection 
const connectDB = require('./database.js');
connectDB();  // Make sure this file contains the database connection logic

// Server listening
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
