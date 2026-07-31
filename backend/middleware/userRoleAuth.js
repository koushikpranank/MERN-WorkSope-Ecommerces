const isUser = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    await jwt.verify(token, process.env.JWT_SECRET);
    next();
    const decode = await jwt.decode(token, process.env.JWT_SECRET);
    if (decode.role != "user") {
        res.status(503).json({ message: "Access denied." });
    }

  } catch (error) {
    if(error instanceof jwt.TokenExpiredError) {
        res.status(501).json({ message: "Token has expired. Please log in again." });
    } else if (error instanceof jwt.JsonWebTokenError) {
        res.status(401).json({ message: "Invalid" });
    } else if (error instanceof jwt.NotBeforeError) {
        res.status(401).json({ message: "Token not active yet. Please try again later." }); 
    }
  } 
};

const isAdmin = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    await jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    if(error instanceof jwt.TokenExpiredError) {
        res.status(501).json({ message: "Token has expired. Please log in again." });
    } else if (error instanceof jwt.JsonWebTokenError) {
        res.status(401).json({ message: "Invalid" });
    } else if (error instanceof jwt.NotBeforeError) {
        res.status(401).json({ message: "Token not active yet. Please try again later." }); 
    }
  } 
};

const isVendor = (req, res, next) => {
  if (req.user && req.user.role == "Vendor") {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Vendor role required." });
  }
};

module.exports = { isUser, isAdmin, isVendor };
