const express = require("express");

const {
    addLocation,
    getAllNoDeletedLocation,
    getAllActivedLocation,
    getAllLocation,
    getLocation,
    updateLocation,
    deleteLocation,
} = require("../controllers/locationController");

const router = express.Router();

// Food Court routes
router.post("/location", addLocation);
router.get("/location", getAllNoDeletedLocation);
router.get("/location/active", getAllActivedLocation);
router.get("/location/:id", getLocation);
router.put("/location/:id", updateLocation);
router.delete("/location/:id", deleteLocation);

module.exports = {
  routes: router,
}