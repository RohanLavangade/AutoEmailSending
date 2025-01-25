const express = require('express');
const EmailController = require('../controllers/emailController');

const router = express.Router();

// Routes
router.post('/send', EmailController.send);
router.get('/fetch/:provider', EmailController.fetchEmails);
router.post('/move-to-inbox', EmailController.moveToInbox);

module.exports = router;
