const { Router } = require("express");
const route = Router();
const { withAuth } = require("../middlewares/withAuth");
const fileParser = require('../config/cloudinary-setup.config')
const {
  login,
  signup,
  logout,
  getUser,
  editUser, 
  uploadUserImage 
} = require("../controllers/auth.controllers");

route
  .post("/signup", signup)
  .post("/login", login)
  .post("/logout", logout)
  .get("/", withAuth, getUser)
  .put("/profile/edit", editUser )
  .post("/upload", fileParser.single("userImage"), uploadUserImage)


module.exports = route;
