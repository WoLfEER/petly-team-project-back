const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/user");
const { validateBody, authenticate, upload } = require("../../middlewares");
const { controllerWrapper } = require("../../helpers");
const { schemas } = require("../../models/userPet");
const {
  schemas: { updateUserSchema },
} = require("../../models/user");

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
  validateBody(updateUserSchema),
  controllerWrapper(ctrl.updateUser)
);
router.delete(
  "/pets/:petId",
  authenticate,
  controllerWrapper(ctrl.removeUserPet)
);

router.get("/currentuser", authenticate, controllerWrapper(ctrl.currentUser));

module.exports = router;
