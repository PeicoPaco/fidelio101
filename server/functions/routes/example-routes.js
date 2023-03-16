const express = require("express");

const {
  getAllExample,
  addExample,
  getExample,
  updateExample,
  deleteExample,
  uploadImgExample,
} = require("../controllers/exampleController")

const router = express.Router();

// Example routes
router.post("/example", addExample);
router.get("/examples", getAllExample);
router.get("/example/:id", getExample);
router.put("/example/:id", updateExample);
router.delete("/example/:id", deleteExample);
router.post("/example/uploadImg",uploadImgExample);


module.exports = {
  routes: router,
}