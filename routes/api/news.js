const express = require("express");
const getNews = require("../../controllers/news/news");
const { controllerWrapper } = require("../../helpers");

const router = express.Router();

router.get("/", controllerWrapper(getNews));

module.exports = router;
