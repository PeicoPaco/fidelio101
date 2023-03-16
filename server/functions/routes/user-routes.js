const express = require("express");

const {
  addUser,
  getAllNoDeletedUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const router = express.Router();

// User routes
router.post("/user", addUser);
router.get("/user/:index/:amount/:lastIdObj", getAllNoDeletedUsers);
router.get("/user/:id", getUser);
router.put("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

module.exports = {
  routes: router,
}