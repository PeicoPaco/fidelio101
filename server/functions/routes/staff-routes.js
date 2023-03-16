const express = require("express");

const {
  addStaff,
  getAllNoDeletedStaff,
  getAllActiveStaff,
  getAllStaff,
  getStaff,
  getAllNoDeletedByProfileStaff,
  getAllNoDeletedByNoProfileStaff,
  updateStaff,
  giveAccessStaff,
  revokeAccessStaff,
  deleteLogicStaff,
  deleteStaff,
} = require("../controllers/staffController");

const router = express.Router();

// Staff routes
router.post("/staff", addStaff);
router.get("/staff/all/:id", getAllNoDeletedStaff);
router.get("/staffByProfile/:id", getAllNoDeletedByProfileStaff);
router.get("/staffByNoProfile/:id", getAllNoDeletedByNoProfileStaff);
router.get("/staff/active/:id", getAllActiveStaff);
router.get("/staff/:id", getStaff);
router.post("/staff/:id", revokeAccessStaff);
router.put("/staff/:id", giveAccessStaff); 
router.delete("/staff/:id", deleteLogicStaff);

module.exports = {
  routes: router,
}