const UserModel = require("../models/UserModel");
const bcrypt = require("bcryptjs");

const Signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    ///to check if task exist in our database under task collection
    const userExist = await UserModel.find({ name, email, password });
    if (userExist.length > 0) {
      res.status(405).json({
        message: "User already Exist",
      });
    }
    const createNewUser = await UserModel.create({
      name,
      password,
      email,
    });
    ///saving everything to the req.body to the database

    const UserResult = await createNewUser.save();
    res.status(200).json({
      _id: UserResult._id,
      name: UserResult.name,
      email: UserResult.email,
      password: UserResult.password,
    });
  } catch (error) {
    ///handling server error message
    res.status(400).json({ message: "Failed to Fetch data" });
  }
};

const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    ///to check if task exist in our database under task collection
    const checkUser = await UserModel.find({ email });
    if (!checkUser) {
      res.status(405).json({
        message: "Invalid  User",
      });
    }
    const validPassword = await bcrypt.compare(password, checkUser.password);
    if (!validPassword) {
      return res.status(619).json({
        message: "Invalid Password",
      });
    }

    res.status(200).json({
      _id: checkUser._id,
      name: checkUser.name,
      email: checkUser.email,
      password: checkUser.password,
    });
  } catch (error) {
    ///handling server error message
    res.status(400).json({ message: "Failed to Fetch data" });
  }
};

module.exports = {
  Signup,
  Login,
};
