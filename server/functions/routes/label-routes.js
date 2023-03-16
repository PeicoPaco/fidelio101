const express = require("express");

const {
  addLabel,
  getAllNoDeletedLabels,
  getAllActiveLabels,
  getAllLabels,
  getLabel,
  updateLabel,
  deleteLogicStaff,
  deleteLabel,
} = require("../controllers/labelController");

const router = express.Router();

// Label routes
router.post("/label", addLabel);
router.get("/label/:id", getAllNoDeletedLabels);
router.get("/label/active/:id", getAllActiveLabels);
router.get("/label/:clientId/:idlabel", getLabel);
router.put("/label/:id", updateLabel);
router.delete("/label/:id", deleteLogicStaff);

module.exports = {
  routes: router,
}