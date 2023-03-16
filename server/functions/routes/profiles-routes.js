const express = require("express");

const {
    getAllProfilesConsola,
    getAllProfilesPortal,
} = require("../controllers/profilesController");

const router = express.Router();

// Rol routes
router.get("/consola", getAllProfilesConsola);
router.get("/portal", getAllProfilesPortal);


module.exports = {
  routes: router,
}