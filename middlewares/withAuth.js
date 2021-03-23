exports.withAuth = (req, res, next) => {
  console.log("req.session", req.session)
  if (!req.session.userId) {
    return res.status(401).json({ message: "unauthorized" });
  }
  next();
};
