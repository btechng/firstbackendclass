const express = require("express");
const { Signup } = require("../controllers/UserController");

const router = express.Router();

router.post("/", Signup);

module.exports = router;
// export default router
