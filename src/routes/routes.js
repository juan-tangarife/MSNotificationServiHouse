const express = require("express");
const router = express.Router();
const {testNotification} = require("../controllers/notificationController.js")
router.get('/', testNotification);

module.exports = router;