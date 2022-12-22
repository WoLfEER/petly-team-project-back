const express = require("express")
const router = express.Router();
const {ctrlWrapper} = require("../../helpers");
const {validateBody, authenticate, upload} = require('../../middlewares');
const {schemas} = require("../../models/user");
const ctrl = require("../../controllers/Auth")

router.post("/register", validateBody(schemas.registerSchema), ctrlWrapper(ctrl.register))
router.post("/login", validateBody(schemas.loginSchema), ctrlWrapper(ctrl.login))
router.get("/logout", authenticate, ctrlWrapper(ctrl.logout))
router.patch("/avatars", authenticate, upload.single("avatar"), ctrlWrapper(ctrl.updateAvatar))

module.exports = router;