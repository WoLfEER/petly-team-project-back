const express = require("express");
const getNews = require("../../controllers/news/news");
const { controllerWrapper } = require("../../helpers");
const { authenticate } = require("../../middlewares");

const router = express.Router();

router.get("/", authenticate, controllerWrapper(getNews));

module.exports = router;
