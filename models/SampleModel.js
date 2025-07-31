const mongoose = require("mongoose");

const SampleSchema = mongoose.Schema(
  {
    ///title is an example of a data field structure
    title: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Sample", SampleSchema);
