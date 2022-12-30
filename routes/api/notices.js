const express = require("express");
const {
  getByCategory,
  addNotice,
  deleteById,
  updateFavorites,
  getById,
} = require("../../controllers/notices");
const { controllerWrapper, isValidId } = require("../../helpers");
const { authenticate, upload, validateBody } = require("../../middlewares");
const { schemas } = require("../../models/notice");

const router = express.Router();

router.get("/:category", controllerWrapper(getByCategory));

router.post(
  "/addnotice",
  authenticate,
  upload.single("avatar"),
  validateBody(schemas.noticesSchema),
  controllerWrapper(addNotice)
);

router.get("/own/favorite", controllerWrapper());
// router.get("/owner/:owner", controllerWrapper(testController));
router.delete(
  "/own/:id",
  authenticate,
  isValidId,
  controllerWrapper(deleteById)
);
router.post(
  "/own/:id",
  authenticate,
  validateBody(schemas.updateFavoriteSchema),
  controllerWrapper(updateFavorites)
);
router.get("/own/:id", controllerWrapper(getById));
// router.get("/owner", authenticate, controllerWrapper());

module.exports = router;
