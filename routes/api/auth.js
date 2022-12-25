const express = require("express")
const router = express.Router();
const {controllerWrapper} = require("../../helpers");
const {validateBody, authenticate } = require('../../middlewares');
const {registerSchema, loginSchema} = require("../../schemas");
const ctrl = require("../../controllers/Auth")


router.post("/register", validateBody(registerSchema), controllerWrapper(ctrl.register))
router.post("/login", validateBody(loginSchema), controllerWrapper(ctrl.login))
router.get("/logout", authenticate, controllerWrapper(ctrl.logout))



module.exports = router;