const express = require("express");

const {
  addClient,
  getAllNoDeletedClients,
  getAllActivedClients,
  getAllClients,
  getClient,
  updateClient,
  deleteLogicClient,
  deleteClient,
} = require("../controllers/clientsController");

const router = express.Router();

// Clients routes
router.post("/clients", addClient);
router.get("/clients", getAllNoDeletedClients);
router.get("/clients/active", getAllActivedClients);
router.get("/clients/:id", getClient);
router.put("/clients/:id", updateClient);
router.delete("/clients/:id", deleteLogicClient);

module.exports = {
  routes: router,
}