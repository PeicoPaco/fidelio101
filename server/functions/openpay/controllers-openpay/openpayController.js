"use strict"

const {openpayCred} = require('../../openpay-config');

const openpayCustomers = async (req, res, next) => {
  const newCustomer = req.body;
  try {
      openpayCred.customers.create(newCustomer, function (error, body, response) {
      if (error) {
          console.error(error);
          return;
      }
      console.log(body);
      return console.log(body);
      });     
  }catch (error) {
      res.status(400).send(error.message);
  }
}
  
const openpayCharges = async (req, res, next) => {
  const newCharge = req.body;
  console.log(newCharge);
  const customerId = "au70whfhe86e9h0lsfnn"
  try {
      openpayCred.customers.cards.create(customerId,newCharge, function (error, body, response) {
      if (error) {
          console.error(error);
          return;
      }
      console.log(body);

      });
  }catch (error) {
    res.status(400).send(error.message);
  }
}
  
const openpayCustomersList = async (req, res, next) => {
  
}

module.exports = {
  openpayCustomers,
  openpayCharges,
  openpayCustomersList,
}