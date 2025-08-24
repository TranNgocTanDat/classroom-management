function checkIntructor(req, res, next) {
  const role = req.headers["x-user-role"];
  const phone = req.headers["x-user-phone"];
  if (!role || !phone) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  if (role !== "instructor") {
    return res.status(403).json({ success: false, message: "Access denied" });
  }

  req.user = { phone, role };
  next();
}

module.exports = checkIntructor;
