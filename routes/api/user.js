const express = require("express")
const router = express.Router();
const ctrl = require("../../controllers/user");
const { validateBody, authenticate, upload} = require("../../middlewares");
const {controllerWrapper} = require("../../helpers");
const schemas = require("../../schemas")
const {updateUserSchema} = require("../../schemas");




router.get("/pets", authenticate, controllerWrapper(ctrl.getUserPets));
router.post("/pets", authenticate, upload.single("avatar"), controllerWrapper(ctrl.addUserPet));
router.patch("/update", authenticate, upload.single("avatar"), validateBody(schemas.updateUserSchema), controllerWrapper(ctrl.updateUser));
router.delete("/pets/:noticeId", authenticate, controllerWrapper(ctrl.removeUserPet));

router.patch("/update", authenticate, upload.single("avatarURL"), validateBody(updateUserSchema), controllerWrapper(ctrl.updateUser));
router.get("/current", authenticate, controllerWrapper(ctrl.getCurrent))

module.exports = router;