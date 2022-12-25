const express = require("express");
const {getFriends} = require("../../controllers/friends");
const { controllerWrapper } = require("../../helpers");

const router = express.Router();

router.get("/", controllerWrapper(getFriends));

module.exports = router;
