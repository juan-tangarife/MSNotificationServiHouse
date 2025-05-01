const express = require('express');
const router = express.Router();
const {sendVerifyCode, send2FACode, sendForgotPasswordHash, sendRestorePasswordHash} = require('../controllers/emailController.js');

router.post('/VerifyCode', sendVerifyCode);
router.post('/2FACode', send2FACode);
router.post('/ForgotPassword', sendForgotPasswordHash);
router.post('/RestorePassword', sendRestorePasswordHash);


module.exports = router;