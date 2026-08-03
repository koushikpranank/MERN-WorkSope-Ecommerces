require("dotenv").config();
const express = require("express");
const cors = require("cors");
const DBconnection = require("./config/db");

// Router Imports
const userRouter = require("./routers/userRouter");
const productRouter = require("./routers/productRouter");
const cartRouter = require("./routers/cartRouter"); // <-- Added Cart Router

const app = express();
const port = process.env.PORT || 5001;

// Database
DBconnection();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// URL Sanitizer
app.use((req, res, next) => {
  if (req.url) req.url = req.url.replace(/(%0A|%0D|%20|\r|\n|\s)+$/gi, "");
  next();
});

// JSON Syntax Error Handler
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid JSON payload" });
  }
  next(err);
});

// Routes
app.get("/", (req, res) => {
  res
    .status(200)
    .json({ success: true, message: "Ecommerce Backend API is running!" });
});
app.use("/api", userRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter); // <-- Added Cart Route

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Path '${req.method} ${req.originalUrl}' not found. Check your route spelling.`,
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
