const express = require("express");
const router = express.Router();
const emailRoutes = require("./email.routes.js")
const messageRoutes = require("./message.routes.js")

router.use("/email", emailRoutes);
router.use("/message", messageRoutes);

module.exports = router;