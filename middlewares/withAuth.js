exports.withAuth = (req, res, next) => {
  console.log("req.session", req.sessiongit)
  if (!req.session.userId) {
    return res.status(401).json({ message: "unauthorized" });
  }
  next();
};
