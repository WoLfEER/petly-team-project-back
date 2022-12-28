const express = require("express");
const {
  getByCategory,
  addNotice,
  deleteById,
  getById,
} = require("../../controllers/notices");
const { controllerWrapper, isValidId } = require("../../helpers");
const { authenticate, upload } = require("../../middlewares");

const router = express.Router();

router.get("/:category", controllerWrapper(getByCategory));
router.post(
  "/addnotice",
  authenticate,
  upload.single("avatar"),
  controllerWrapper(addNotice)
);

// router.get("/owner/favorite", controllerWrapper(testController));
// router.get("/owner/:owner", controllerWrapper(testController));
router.delete("/:id", authenticate, isValidId, controllerWrapper(deleteById));
router.get("/:id", authenticate, isValidId, controllerWrapper(getById));

module.exports = router;
