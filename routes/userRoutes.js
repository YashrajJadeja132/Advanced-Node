const express = require("express");
const userController = require("../controllers/userController");
const { validateCreateUser } = require("../validators/userValidator");
const { protect } = require("../middleware/authMiddleware");
const paginate = require("../middleware/paginate");
const filter = require("../middleware/filter");
const sort = require("../middleware/sort");
const User = require("../models/userModel");

const router = express.Router();

router.get(
  "/",
  paginate(User),
  filter(User),
  sort(User),
  userController.getAllUsers
);
router.get("/:id", userController.getUserById);
router.post("/", validateCreateUser, userController.createUser);
router.put("/:id", protect, userController.updateUser);
router.delete("/:id", protect, userController.deleteUser);

module.exports = router;
