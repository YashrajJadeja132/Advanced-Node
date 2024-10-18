const protect = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).json({ message: "Forbidden: No token provided" });
  }
  next();
};

module.exports = { protect };
