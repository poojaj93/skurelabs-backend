import express from "express";
import userRoutes from "./routes/userRoutes.js";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

const limiter = rateLimit({
  windowMs: 1000*60*15, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});

// Configure CORS middleware to allow requests from your frontend domain
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'], 
  credentials: true, 
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(limiter)
app.use(helmet());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/users", userRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  const message = err.message || "An internal server error occurred.";

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
});

// Start server after DB connection
connectDB()
  .then(() => {
    console.log("Database connected successfully.");
    app.listen(PORT,'10.10.61.239', () => {
       console.log(`Server running at http://0.0.0.0:${PORT}`);
    });
  })
  .catch(error => {
    console.error("Failed to connect to database:", error);
    process.exit(1);
  });