const { verifyToken } = require("../helpers/jwt");

const authMiddleware = (allowedRoles = []) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    try {
      const decoded = verifyToken(token);
      req.user = decoded; // { uid, role }

      if (allowedRoles.length && !allowedRoles.includes(decoded.role)) {
        return res.status(403).json({ error: "Forbidden" });
      }

      next();
    } catch (err) {
      return res.status(403).json({ error: "Invalid or expired token" });
    }
  };
};

module.exports = authMiddleware;
