const dotenv = require("dotenv");
// 1. ALWAYS load dotenv first before doing anything else
dotenv.config();
const express = require("express");
const cors = require("cors");
const DBconnection = require("./config/db");
const userRouter = require("./routers/userRouter");
const app = express();
const port = process.env.PORT || process.env.port || 5001;
// 2. Database Connection
DBconnection();
// 3. Global Security & Parsing Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Middleware to automatically sanitize URLs from trailing spaces, newlines, and carriage returns
app.use((req, res, next) => {
  if (req.url) {
    req.url = req.url.replace(/(%0A|%0D|%20|\r|\n|\s)+$/gi, "");
  }
  next();
});
// Middleware to catch malformed JSON payloads
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ message: "Invalid JSON payload" });
  }
  next(err);
});
// 4. Base Route / Root Handler (This fixes your Chrome browser issue!)
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Ecommerce Backend API is running successfully!",
    documentation: "Append /api to access specific endpoints.",
  });
});
// 5. API Routes
app.use("/api", userRouter);
// 6. Catch-all 404 Route for undefined paths
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `The requested path '${req.method} ${req.originalUrl}' was not found. Did you forget the '/api' prefix?`,

    availableRoutes: {
      register: "POST /api/register",
      login: "POST /api/login",
      getAllUsers: "GET /api/getallusers",
      deleteUser: "DELETE /api/deleteuser/:id",
    },
  });
});
// 7. Global error handling middleware
app.use((err, req, res, next) => {
  console.error("Unhandled Server Error:", err);
  res.status(err.status || 5001).json({
    success: false,
    message: err.message || "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});
// 8. Start Server
app.listen(port, () => console.log("server is running on port " + port));
