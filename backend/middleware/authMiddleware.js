const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).json({ message: "No token, authorization denied!" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Attach user ID to request
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token!" });
  }
};

module.exports = verifyToken;
