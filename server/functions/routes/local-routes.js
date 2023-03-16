const express = require("express");

const {
    addLocal,
    getAllNoDeletedLocals,
    getAllActivedLocals,
    getAllNoDeletedByClientIdLocals,
    getAllLocals,
    getLocal,
    updateLocal,
    deleteLogicLocal,
    deleteLocal,
} = require("../controllers/localController");

const router = express.Router();

// Local routes
router.post("/local", addLocal);
router.get("/local", getAllNoDeletedLocals);
router.get("/local/active", getAllActivedLocals);
router.get("/localClient/:id", getAllNoDeletedByClientIdLocals);
router.get("/local/:id", getLocal);
router.put("/local/:id", updateLocal);
router.delete("/local/:id", deleteLogicLocal);

module.exports = {
  routes: router,
}