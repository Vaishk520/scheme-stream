require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db.js'); // Import MongoDB connection
const UserModel = require('./models/userModel.js');

console.log("✅ schemeRoutes import attempt in server.js"); // Log before importing
const authRoutes = require('./routes/authRoutes.js');
const schemeRoutes = require('./routes/schemeRoutes.js');
console.log("✅ schemeRoutes successfully imported"); // Log after importing
const applicationRoutes = require('./routes/applicationRoutes.js');

const app = express();
console.log("✅ Express app initialized");

// Middleware
app.use(express.json());
app.use(cors());

//configure CORS
const corsOptions ={
  origin: process.env.REACT_APP_API_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["content-Type", "Authorization"],
};
app.use(cors(corsOptions));

// Middleware for logging incoming requests
app.use((req, res, next) => {
  console.log(`Incoming Request: ${req.method} ${req.url}`);
  next();
});

// Connect to MongoDB
connectDB().then(() => {
  console.log("✅ MongoDB Connected Successfully");
}).catch((err) => {
  console.error("❌ Failed to connect to MongoDB:", err);
  process.exit(1);
});

// User registration route
app.post('/register', async (req, res) => {
  try {
    const user = await UserModel.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Use API routes
app.use('/api/auth', authRoutes);
app.use('/api/schemes', schemeRoutes);
app.use('/api/applications', applicationRoutes);

console.log("✅ API routes are now active");

// 404 Route Handler
app.use((req, res, next) => {
  console.log(`⚠️ 404 Not Found: ${req.method} ${req.url}`);
  res.status(404).json({ message: "Endpoint Not Found" });
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("🚨 Error:", err.stack);
  res.status(500).json({ message: "Something went wrong!", error: err.message });
});

// Set the port
const PORT = process.env.PORT || 5001;

// Root endpoint
app.get("/", (req, res)=> {
  res.send("welcome to the product API");
});

// Start the server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));