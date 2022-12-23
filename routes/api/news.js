const express = require("express");
const getAll = require("../../controllers/getAll");
const { controllerWrapper } = require("../../helpers");
const { authenticate } = require("../../middlewares");

const router = express.Router();

router.get("/", authenticate, controllerWrapper(getAll));

module.exports = router;
