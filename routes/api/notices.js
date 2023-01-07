const express = require("express");
const {
  getByCategory,
  addNotice,
  deleteOwnNoticeById,
  updateFavorites,
  getOwnNotice,
  getOwnNoticeFavorites,
  deleteFavorites,
} = require("../../controllers/notices");
const { controllerWrapper, isValidId } = require("../../helpers");
const { authenticate, upload, validateBody } = require("../../middlewares");
const { schemas } = require("../../models/notice");

const router = express.Router();

router.get("/:category", controllerWrapper(getByCategory));

router.get(
  "/user/favorite",
  authenticate,
  controllerWrapper(getOwnNoticeFavorites)
);

router.get("/user/own", authenticate, controllerWrapper(getOwnNotice));

router.post(
  "/addnotice",
  authenticate,
  upload.single("avatar"),
  validateBody(schemas.noticesSchema),
  controllerWrapper(addNotice)
);

router.patch(
  "/user/:id/favorites",
  authenticate,
  validateBody(schemas.updateFavoriteSchema),
  controllerWrapper(updateFavorites)
);

router.delete(
  "/user/:id/favorites",
  authenticate,
  validateBody(schemas.updateFavoriteSchema),
  controllerWrapper(deleteFavorites)
);

router.delete(
  "/user/:id",
  authenticate,
  isValidId,
  controllerWrapper(deleteOwnNoticeById)
);

module.exports = router;
