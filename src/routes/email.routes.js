const express = require('express');
const router = express.Router();
const {sendVerifyCode, send2FACode} = require('../controllers/emailController.js');

router.post('/VerifyCode', sendVerifyCode);
router.post('/2FACode', send2FACode);


module.exports = router;