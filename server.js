const express = require("express");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const taskRoutes = require("./routes/TaskRoutes");
const userRoutes = require("./routes/UserRoutes");
const connectDB = require("./config/db");
const colors = require("colors");
const cors = require("cors");

const app = express();
app.use(cors());
connectDB();
const PORT = process.env.PORT;
app.use(bodyParser.json());

app.use("/Task", taskRoutes); // Task routes
app.use("/api/task/users", userRoutes); // User routes with unique routing

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.blue);
});
