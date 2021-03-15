const { Router } = require("express");
const route = Router();
const { withAuth } = require("../middlewares/withAuth");
const {
  login,
  signup,
  logout,
  getUser,
  editUser,  
} = require("../controllers/auth.controllers");

route
  .post("/signup", signup)
  .post("/login", login)
  .post("/logout", logout)
  .get("/", withAuth, getUser)
  .put("/profile/edit", editUser )

module.exports = route;
