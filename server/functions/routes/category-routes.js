const express = require("express");

const {
  addCategory,
  getAllNoDeletedCategory,
  getAllActiveCategory,
  getCategory,
  updateCategory,
  deleteLogicCategory,
} = require("../controllers/categoryController");

const router = express.Router();

// Category routes
router.post("/category", addCategory);
router.get("/category", getAllNoDeletedCategory);
router.get("/category/active", getAllActiveCategory);
router.get("/category/:id", getCategory);
router.put("/category/:id", updateCategory);
router.delete("/category/:id", deleteLogicCategory);

module.exports = {
  routes: router,
}