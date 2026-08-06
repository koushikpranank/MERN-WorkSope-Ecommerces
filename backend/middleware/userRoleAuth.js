const jwt = require("jsonwebtoken");

const isUser = async (req, res, next) => {
  try {
    let token = req.headers["authorization"];
    if (token === undefined) {
      return res.status(401).json({ message: "Token Not Found" });
    }
    token = token.split(" ")[1];
    await jwt.verify(token, process.env.Secret_Key);
    const decodedToken = await jwt.decode(token);

    if (
      decodedToken.role !== "user" &&
      decodedToken.role !== "admin" &&
      decodedToken.role !== "vendor"
    ) {
      return res.status(403).json({ message: "access not found" });
    }
    req.user = decodedToken;
    next();
  } catch (error) {
    if (error instanceof jwt.NotBeforeError) {
      return res.status(401).json({ message: "Token still not active" });
    } else if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: "Token Expired" });
    } else if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: "invalid Token" });
    }
    return res.status(500).json({ message: "internal server error" });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    let token = req.headers["authorization"];
    if (token === undefined) {
      return res.status(401).json({ message: "Token Not Found" });
    }
    token = token.split(" ")[1];
    await jwt.verify(token, process.env.Secret_Key);
    const decodedToken = await jwt.decode(token);
    if (decodedToken.role !== "admin") {
      return res.status(403).json({ message: "access denied" });
    }
    req.user = decodedToken;
    next();
  } catch (error) {
    if (error instanceof jwt.NotBeforeError) {
      return res.status(401).json({ message: "Token still not active" });
    } else if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: "Token Expired" });
    } else if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: "invalid Token" });
    }
    return res.status(500).json({ message: "internal server error" });
  }
};

const isVendor = async (req, res, next) => {
  try {
    let token = req.headers["authorization"];
    if (token === undefined) {
      return res.status(401).json({ message: "token not found" });
    }
    token = token.split(" ")[1];
    await jwt.verify(token, process.env.Secret_Key);
    const decodedToken = await jwt.decode(token);
    if (decodedToken.role !== "vendor") {
      return res.status(403).json({ message: "access denied" });
    }
    req.user = decodedToken;
    next();
  } catch (error) {
    if (error instanceof jwt.NotBeforeError) {
      return res.status(401).json({ message: "token not active" });
    } else if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: "Token Expired" });
    } else if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: "Invalid Token" });
    }
    return res.status(500).json({ message: "internal server error" });
  }
};

module.exports = { isUser, isAdmin, isVendor };
