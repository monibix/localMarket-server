const User = require("../model/user.model");
const bcrypt = require("bcryptjs");
const {
  hasCorrectPasswordFormat,
  isMongoError,
  isMongooseErrorValidation,
} = require("../utils/validators.utils");

exports.signup = async (req, res) => {
  try {
    const { password, email } = req.body;
    const hasMissingCredentials = !password || !email;
    if (hasMissingCredentials) {
      return res.status(400).json({ message: "Missing credentials" });
    }
    if (!hasCorrectPasswordFormat(password)) {
      return res.status(400).json({ message: "Incorrect email or password format" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "This email alredy exists, please choose another one or login" });
    }
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({ email, hashedPassword });
    req.session.userId = newUser._id;
    return res.status(200).json({ user: newUser.email, id: newUser._id });
  } catch (e) {
    if (isMongooseErrorValidation(e)) {
      return res.status(400).json({ message: "Incorrect email format" });
    }
    if (isMongoError(e)) {
      return res.status(400).json({ message: "Duplicate field" });
    }
    return res.status(400).json({ message: "Wrong request" });
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
      return res.status(400).json({ message: "Incorrect email or password" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "This email is not registered, sign up" });
    }
    const hasCorrectPassword = await bcrypt.compare(
      password,
      user.hashedPassword
    );
    if (!hasCorrectPassword) {
      return res.status(401).json({ message: "Incorrect password" });
    }
    req.session.userId = user._id;
    return res.status(200).json({ user: user.email, id: user._id });
  } catch (e) {
    if (isMongooseErrorValidation(e)) {
      return res.status(400).json({ message: "Incorrect email format" });
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
  const { hashedPassword, ...user } = await User.findById({
    _id: userId,
  }).lean();
  res.status(200).json(user);
};

exports.editUser = async(req, res) => {
  try {
    const { userId } = req.session; 
    const userInfo = req.body; 
    const updatedUser = await User.findByIdAndUpdate({_id: userId}, userInfo)
    res.status(200).json(updatedUser)
  }
  catch(error){
    return res.status(400).json({ message: "error when edit a user"})
  }
}

exports.uploadUserImage = async(req, res, next) => {
  if(!req.file) {
      next (new Error ("No file uploaded"));
  }
  res.json(req.file.path)
}




