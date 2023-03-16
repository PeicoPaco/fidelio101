const express = require("express");

const {
  addStaffFidelio,
  getAllNoDeletedStaffFidelio,
  getAllNoDeletedByProfileStaffFidelio,
  getAllNoDeletedByNoProfileStaffFidelio,
  getAllStaffFidelio,
  getStaffFidelioByProfile,
  getAllActivedStaffFidelio,
  getStaffFidelio,
  giveAccessStaffFidelio,
  revokeAccessStaffFidelio,
  addLasLogin,
  deleteStaffFidelio,
} = require("../controllers/staffFidelioController");

const router = express.Router();

// StaffFidelio routes
router.post("/staffFidelio", addStaffFidelio);
router.get("/staffFidelio", getAllNoDeletedStaffFidelio);
router.get("/staffFidelioByNoProfile", getAllNoDeletedByNoProfileStaffFidelio);
router.get("/staffFidelioByProfile", getAllNoDeletedByProfileStaffFidelio);
router.get("/staffFidelio/active", getAllStaffFidelio);
router.get("/staffFidelio/:id", getStaffFidelio);
router.post("/staffFidelio/:id", revokeAccessStaffFidelio);
router.put("/staffFidelio/:id", giveAccessStaffFidelio);
router.get("/staffFidelio/login/:id", addLasLogin);
router.delete("/staffFidelio/:id", deleteStaffFidelio);

module.exports = {
  routes: router,
}