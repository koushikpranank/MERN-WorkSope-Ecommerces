const jwt = require("jsonwebtoken");
const isUser = async (req, res, next) => {
  try {
    let token = req.headers["authorization"];
    if (token == undefined) {
      res.status(401).json({ message: "Token Not Found" });
    }
    token = token.split(" ")[1];
    await jwt.verify(token, process.env.Secret_Key);
    const decodedToken = await jwt.decode(token);

    if (decodedToken.role != "user") {
      res.status(403).json({ message: "access not found" });
    }
    next();
  } catch (error) {
    if (error instanceof jwt.NotBeforeError) {
      res.status(501).json({ message: "Token still not active" });
    } else if (error instanceof jwt.TokenExpiredError) {
      res.status(501).json({ message: "Token Expired" });
    } else if (error instanceof jwt.JsonWebTokenError) {
      res.status(501).json({ message: "invalid Token" });
    }
  }
};

const isAdmin = async (req, res, next) => {
  try {
    let token = req.headers["authorization"];
    if (token == undefined) {
      res.status(401).json({ message: "Token Not Found" });
    }
    token = token.split(" ")[1];
    await jwt.verify(token, process.env.Secret_Key);
    const decodedToken = await jwt.decode(token);
    if (decodedToken.role != "admin") {
      res.status(403).json({ message: "access denied" });
    }
    next();
  } catch (error) {
    if (error instanceof jwt.NotBeforeError) {
      res.status(501).json({ message: "Token still not active" });
    } else if (error instanceof jwt.TokenExpiredError) {
      res.status(501).json({ message: "Token Expired" });
    } else if (error instanceof jwt.JsonWebTokenError) {
      res.status(501).json({ message: "invalid Token" });
    }
    res.status(500).json({ message: "internal server error" });
  }
};

const isVendor = async (req, res, next) => {
  try {
    let token = req.headers["authorization"];
    if (token == undefined) {
      res.status(401).json({ message: "token not found" });
    }
    token = token.split(" ")[1];
    await jwt.verify(token, process.env.Secret_Key);
    const decodedToken = await jwt.decode(token);
    if (decodedToken.role != "vendor") {
      res.status(403).json({ message: "access denied" });
    }
    req.user = decodedToken;
    next();
  } catch (error) {
    if (error instanceof jwt.NotBeforeError) {
      res.status(501).json({ message: "token not active" });
    } else if (error instanceof jwt.TokenExpiredError) {
      res.status(501).json({ message: "Token Expired" });
    } else if (error instanceof jwt.JsonWebTokenError) {
      res.status(501).json({ message: "Invalid Token" });
    }
    res.status(500).json({ message: "internal server error" });
  }
};

module.exports = { isUser, isAdmin, isVendor };
