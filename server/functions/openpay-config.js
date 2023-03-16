"use strict"

const Openpay = require('openpay');

const openpayCred = new Openpay({
    merchantId: '',
    privateKey: '',
    isProductionReady: false
  });
  
  openpayCred.setMerchantId('m0u8rzjykr4naovuhpsh');
  openpayCred.setPrivateKey('sk_82e72e50ca2c4b59ab8c91783a7254ec');

  module.exports = {
    openpayCred,
  }

