const express = require("express")
const router = express.Router();
const {controllerWrapper} = require("../../helpers");
const {validateBody, authenticate, upload } = require('../../middlewares');
const {registerSchema, loginSchema, updateUserSchema} = require("../../schemas");
const ctrl = require("../../controllers/Auth")


router.post("/register", validateBody(registerSchema), controllerWrapper(ctrl.register))
router.post("/login", validateBody(loginSchema), controllerWrapper(ctrl.login))
router.get("/logout", authenticate, controllerWrapper(ctrl.logout))
router.patch("/update", authenticate, upload.single("avatarURL"), validateBody(updateUserSchema), controllerWrapper(ctrl.updateUser));

module.exports = router;