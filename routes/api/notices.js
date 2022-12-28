const express = require("express");
const {
  getByCategory,
  addNotice,
  deleteById,
  // updateFavorites,
  getById
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
router.delete(
  "/own/:id",
  authenticate,
  isValidId,
  controllerWrapper(deleteById)
);
// router.post("/own/:id", authenticate, isValidId, controllerWrapper(updateFavorites));
router.get("/:id",  controllerWrapper(getById));
// router.get("/owner", authenticate, controllerWrapper());

module.exports = router;
