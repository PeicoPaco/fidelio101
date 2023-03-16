const express = require("express");

const {
  openpayCustomers,
  openpayCharges,
  openpayCustomersList,
} = require("../controllers-openpay/openpayController")

const router = express.Router();

router.post("/createCustomers", openpayCustomers);
router.post("/customersCharges", openpayCharges);
router.get("/customersList", openpayCustomersList);

module.exports = {
  routes: router,
}