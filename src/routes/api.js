const express = require('express');
const router = express.Router();

const userController = require('../controllers/UserController');
const libraryController = require('../controllers/LibraryController');
const paymentController = require('../controllers/PaymentController');

// User / Auth
router.post('/register', userController.register);
router.post('/cancel-subscription', userController.cancelSubscription);

// Search Query Proxy
router.get('/search', libraryController.search);

// Payment & Subscriptions
router.post('/subscribe', paymentController.subscribe);
router.post('/payment/success', paymentController.paymentSuccess);
router.post('/payment/fail', paymentController.paymentFail);
router.post('/payment/cancel', paymentController.paymentCancel);
router.post('/payment/ipn', paymentController.paymentIpn);

// GET routes for payment handlers (SSLCommerz uses POST generally but sometimes redirects using GET)
router.get('/payment/success', paymentController.paymentSuccess);
router.get('/payment/fail', paymentController.paymentFail);
router.get('/payment/cancel', paymentController.paymentCancel);

module.exports = router;
