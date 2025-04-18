const express = require('express');
const   router = express.Router();
const proxyController = require('../controllers/ProxyController');

// CRUD routes for users
// router.post('/create', proxyController.createInvoice);       // Create a new user
router.post('/send', proxyController.CreatePDf_TriggerKlaviyo);       // Create a new user

module.exports = router;
