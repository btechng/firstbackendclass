const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    assignedTo: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      minlength: [5, "minimum lenght should be more that 20 words"],
      maxlength: [500, "maximum lenght shouldnt exceed 500 words"],
    },
    startDate: {
      type: Date,
      required: false,
    },
    endDate: {
      type: Date,
      required: false,
    },
    projectLink: {
      type: String,
      required: false,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },
  },

  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Task", TaskSchema);
