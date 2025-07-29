const express = require("express");
const {
  GetAllTask,
  CreateTask,
  GetSingleTask,
  UpdateSingle,
  DeleteSingleTask,
} = require("../controllers/Task");

const router = express.Router();
router.get("/", GetAllTask);
router.get("/:id", GetSingleTask);
router.put("/:id", UpdateSingle);
router.delete("/:id", DeleteSingleTask);
router.post("/", CreateTask);

module.exports = router;
// export default router
