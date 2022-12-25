const express = require("express");
const testController = require("../../controllers/testControler");
const { controllerWrapper } = require("../../helpers");
// const { authenticate } = require("../../middlewares");

const router = express.Router();

router.get("/:id", controllerWrapper(testController));
router.get("/category/:category", controllerWrapper(testController));
router.post("/category/addnotice", controllerWrapper(testController));
router.get("/owner/favorite", controllerWrapper(testController));
router.get("/owner/:owner", controllerWrapper(testController));
router.delete("/:id", controllerWrapper(testController));

module.exports = router;
