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
const jsonParser = bodyParser.json();
app.use(jsonParser);

app.use("/Task", taskRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.blue);
});
