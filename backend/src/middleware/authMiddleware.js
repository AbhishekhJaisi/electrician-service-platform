const jwt = require("jsonwebtoken");

/** Admin-only routes */
const protect = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Not authorised — no token" });
  }
  try {
    const decoded = jwt.verify(auth.split(" ")[1], process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch {
    return res.status(401).json({ success: false, message: "Token invalid or expired" });
  }
};

/** Customer-only routes */
const protectCustomer = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Not authorised — no token" });
  }
  try {
    const decoded = jwt.verify(auth.split(" ")[1], process.env.JWT_SECRET);
    if (decoded.role !== "customer") {
      return res.status(403).json({ success: false, message: "Customer access only" });
    }
    req.customer = decoded;
    next();
  } catch {
    return res.status(401).json({ success: false, message: "Token invalid or expired" });
  }
};

module.exports = { protect, protectCustomer };
