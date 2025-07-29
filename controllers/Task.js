const TaskModel = require("../models/TaskModel");

const GetAllTask = async (req, res) => {
  try {
    const result = await TaskModel.find().sort({ createdAt: -1 });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: "Failed to Fetch data" });
  }
};
const GetSingleTask = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await TaskModel.findById(id);
    if (!result) {
      return res.status(406).json({
        message: "Task ID not found",
      });
    } else {
      res.status(201).json(result);
    }
  } catch (error) {
    res.status(400).json({ message: "Server Error" });
  }
};
const DeleteSingleTask = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await TaskModel.findByIdAndDelete(id);
    if (!result) {
      return res.status(406).json({
        message: "Task ID not found",
      });
    } else {
      res.status(201).json({
        message: "Task ID deleted successfully",
      });
    }
  } catch (error) {
    res.status(400).json({ message: "Server Error" });
  }
};

const CreateTask = async (req, res) => {
  const { title, assignedTo, description, startDate, endDate } = req.body;
  try {
    ///to check if task exist in our database under task collection
    const projectExist = await TaskModel.find({ title, assignedTo });
    if (projectExist.length > 0) {
      res.status(405).json({
        message: "Task Already Assigned to this user",
      });
    }

    ///to create a new task
    const createNewTask = await TaskModel.create({
      title,
      assignedTo,
      description,
      startDate,
      endDate,
    });

    ///saving everything to the req.body to the database

    const taskResult = await createNewTask.save();

    ///where i am returning the data if successful
    res.status(200).json({
      _id: taskResult._id,
      title: taskResult.title,
      assignedTo: taskResult.assignedTo,
      description: taskResult.description,
      startDate: taskResult.startDate,
      endDate: taskResult.endDate,
    });
  } catch (error) {
    ///handling server error message
    res.status(400).json({ message: "Failed to Fetch data" });
  }
};
const UpdateSingle = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    assignedTo,
    description,
    startDate,
    endDate,
    status,
    isCompleted,
    projectLink,
  } = req.body;
  try {
    const result = await TaskModel.findById(id);
    if (!result) {
      return res.status(406).json({
        message: "Task ID not found",
      });
    } else {
      result.title = title || result.title;
      result.assignedTo = assignedTo || result.assignedTo;
      result.description = description || result.description;
      result.startDate = startDate || result.startDate;
      result.endDate = endDate || result.endDate;
      result.status = status || result.status;
      result.isCompleted = isCompleted || result.isCompleted;
      result.projectLink = projectLink || result.projectLink;

      await result.save();
      res.status(201).json(result);
    }
  } catch (error) {
    res.status(400).json({ message: "Server Error" });
  }
};
module.exports = {
  GetAllTask,
  CreateTask,
  GetSingleTask,
  UpdateSingle,
  DeleteSingleTask,
};
