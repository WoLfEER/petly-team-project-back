const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/user");
const { validateBody, authenticate, upload } = require("../../middlewares");
const { controllerWrapper } = require("../../helpers");
const { schemas } = require("../../models/userPet");

router.get("/userinfo", authenticate, controllerWrapper(ctrl.getUserPets));
router.post(
  "/pets",
  authenticate,
  upload.single("avatar"),
  validateBody(schemas.petSchema),
  controllerWrapper(ctrl.addUserPet)
);
router.patch(
  "/update",
  authenticate,
  upload.single("avatar"),
  validateBody(schemas.updateUserSchema),
  controllerWrapper(ctrl.updateUser)
);
router.delete(
  "/pets/:petId",
  authenticate,
  controllerWrapper(ctrl.removeUserPet)
);

module.exports = router;
