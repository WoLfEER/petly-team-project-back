const express = require("express")
const router = express.Router();
const {ctrlWrapper} = require("../../helpers");
const {validateBody, authenticate, upload} = require('../../middlewares');
const {schemas} = require("../../schemas");
const ctrl = require("../../controllers/Auth")

router.post("/register", validateBody(schemas.registerSchema), ctrlWrapper(ctrl.register))
router.post("/login", validateBody(schemas.loginSchema), ctrlWrapper(ctrl.login))
router.get("/logout", authenticate, ctrlWrapper(ctrl.logout))
router.patch("/update", authenticate, upload.single("avatarURL"), validateBody(schemas.updateUserSchema), ctrlWrapper(ctrl.updateUser));

module.exports = router;