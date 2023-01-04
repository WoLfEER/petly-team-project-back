const express = require("express");
const {
  getByCategory,
  addNotice,
  deleteById,
  updateFavorites,
  getById,
  getOwn,
  getFavorite,
  deleteFavorites,
} = require("../../controllers/notices");
const { controllerWrapper, isValidId } = require("../../helpers");
const { authenticate, upload, validateBody } = require("../../middlewares");
const { schemas } = require("../../models/notice");

const router = express.Router();

router.get("/:category", controllerWrapper(getByCategory));
router.get("/own/favorite", authenticate, controllerWrapper(getFavorite));
router.get("/own/:owner", authenticate, controllerWrapper(getOwn));
router.get("/own/:id", controllerWrapper(getById));

router.post(
  "/addnotice",
  authenticate,
  upload.single("avatar"),
  validateBody(schemas.noticesSchema),
  controllerWrapper(addNotice)
);

router.post(
  "/own/:id",
  authenticate,
  validateBody(schemas.updateFavoriteSchema),
  controllerWrapper(updateFavorites)
);

router.patch(
  "/own/:id/favorites",
  authenticate,
  validateBody(schemas.updateFavoriteSchema),
  controllerWrapper(updateFavorites)
);

router.delete(
  "/own/:id/favorites",
  authenticate,
  validateBody(schemas.updateFavoriteSchema),
  controllerWrapper(deleteFavorites)
);

router.delete(
  "/own/:id",
  authenticate,
  isValidId,
  controllerWrapper(deleteById)
);

module.exports = router;
