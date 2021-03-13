const User = require("../model/user.model");
const bcrypt = require("bcryptjs");
const {
  hasCorrectPasswordFormat,
  isMongoError,
  isMongooseErrorValidation,
} = require("../utils/validators.utils");

exports.signup = async (req, res) => {
  try {
    console.log("console")
    const { password, email } = req.body;
    const hasMissingCredentials = !password || !email;
    if (hasMissingCredentials) {
      return res.status(400).json({ message: "missing credentials" });
    }
    console.log("reqbody", req.body)
    if (!hasCorrectPasswordFormat(password)) {
      console.log("password", password)
      return res.status(400).json({ message: "incorrect password format" });
    }
    console.log("reqbody", req.body)
    const user = await User.findOne({ email });

    console.log("user", user)

    if (user) {
      
      return res.status(400).json({ message: "user alredy exists" });
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({ email, hashedPassword });
    console.log("reqsession", req.session)
    console.log("newuser", newUser)
    req.session.userId = newUser._id;
    console.log("console linia 37", req.session)
    return res.status(200).json({ user: newUser.email, id: newUser._id });
  } catch (e) {
    console.log("e", e)
    if (isMongooseErrorValidation(e)) {
      return res.status(400).json({ message: "incorrect email format" });
    }
    if (isMongoError(e)) {
      return res.status(400).json({ message: "duplicate field" });
    }
    return res.status(400).json({ message: "wrong request" });
  }
};

exports.login = async (req, res) => {
  try {
    const { password, email } = req.body;
    const hasMissingCredentials = !password || !email;
    if (hasMissingCredentials) {
      return res.status(400).json({ message: "missing credentials" });
    }

    if (!hasCorrectPasswordFormat(password)) {
      return res.status(400).json({ message: "incorrect password" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "user does not exist" });
    }
    const hasCorrectPassword = await bcrypt.compare(
      password,
      user.hashedPassword
    );
    if (!hasCorrectPassword) {
      return res.status(401).json({ message: "unauthorize" });
    }

    req.session.userId = user._id;

    return res.status(200).json({ user: user.email, id: user._id });
  } catch (e) {
    if (isMongooseErrorValidation(e)) {
      return res.status(400).json({ message: "incorrect email format" });
    }
    return res.status(400).json({ message: "wrong request" });
  }
};

exports.logout = async (req, res) => {
  await req.session.destroy();
  res.status(200).json({ message: "logout" });
};

exports.getUser = async (req, res) => {
  const { userId } = req.session;
  const { email, _id } = await User.findOne(userId);
  res.status(200).json({ id: _id, email });
};

//no funciona en postman
exports.editUser = async(req, res) => {
  try {
    const { userId } = req.session; //undefined
    console.log("reqsession", req.session)
    const userInfo = req.body; //undefined
    console.log("reqbody", req.body)
    const updatedUser = await User.findByIdAndUpdate(userId, userInfo)
    res.status(200).json(updatedUser)
  }
  catch(error){
    return res.status(400).json({ message: "error when edit a user"})
  }
}


