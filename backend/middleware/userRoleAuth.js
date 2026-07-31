const jwt = require("jsonwebtoken");

const isUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (token == undefined) {
      res.status(401).json({ message: "Unauthorized. No token provided." });
    }
    jwt.verify(token, process.env.JWT_SECRET);
    const decode = jwt.decode(token, process.env.JWT_SECRET);
    if (decode.role != "user") {
      res.status(503).json({ message: "Access denied." });
    }
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res
        .status(501)
        .json({ message: "Token has expired. Please log in again." });
    } else if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ message: "Invalid" });
    } else if (error instanceof jwt.NotBeforeError) {
      res
        .status(401)
        .json({ message: "Token not active yet. Please try again later." });
    }
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (token == undefined) {
      res.status(401).json({ message: "Unauthorized. No token provided." });
    }
    jwt.verify(token, process.env.JWT_SECRET);
    const decode = jwt.decode(token, process.env.JWT_SECRET);
    if (decode.role != "admin") {
      res.status(503).json({ message: "Access denied." });
    }
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res
        .status(501)
        .json({ message: "Token has expired. Please log in again." });
    } else if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ message: "Invalid" });
    } else if (error instanceof jwt.NotBeforeError) {
      res
        .status(401)
        .json({ message: "Token not active yet. Please try again later." });
    }
  }
};

const isVendor = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (token == undefined) {
      res.status(401).json({ message: "Unauthorized. No token provided." });
    }
    jwt.verify(token, process.env.JWT_SECRET);
    const decode = jwt.decode(token, process.env.JWT_SECRET);
    if (decode.role != "vendor") {
      res.status(503).json({ message: "Access denied." });
    }
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res
        .status(501)
        .json({ message: "Token has expired. Please log in again." });
    } else if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ message: "Invalid" });
    } else if (error instanceof jwt.NotBeforeError) {
      res
        .status(401)
        .json({ message: "Token not active yet. Please try again later." });
    }
  }
};

module.exports = { isUser, isAdmin, isVendor };
