const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = mongoose.Schema(
  {
    ///title is an example of a data field structure
    name: {
      type: String,
    },
    email: { type: String, unique: true },
    password: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);
UserSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});
module.exports = mongoose.model("User", UserSchema);
