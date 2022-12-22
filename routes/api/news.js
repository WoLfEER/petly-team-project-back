const express = require("express");
const getAll = require("../../controllers/getAll");
const { controllerWrapper } = require("../../helpers");

const router = express.Router();

router.get("/", controllerWrapper(getAll));

module.exports = router;
