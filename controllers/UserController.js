const UserModel = require("../models/UserModel");

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
      password: UserResult.email,
    });
  } catch (error) {
    ///handling server error message
    res.status(400).json({ message: "Failed to Fetch data" });
  }
};

module.exports = {
  Signup,
};
