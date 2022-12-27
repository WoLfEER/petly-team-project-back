const express = require("express");
const { getByCategory, addNotice } = require("../../controllers/notices");
const { controllerWrapper } = require("../../helpers");
const { authenticate } = require("../../middlewares");
// const { authenticate } = require("../../middlewares");

const router = express.Router();

router.get("/:category", controllerWrapper(getByCategory));
router.post("/addnotice", authenticate, controllerWrapper(addNotice));
// router.get("/:id", controllerWrapper(testController));
// router.get("/owner/favorite", controllerWrapper(testController));
// router.get("/owner/:owner", controllerWrapper(testController));
// router.delete("/:id", controllerWrapper(testController));

module.exports = router;
