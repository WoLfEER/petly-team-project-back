const express = require("express");
const router = express.Router();
const { controllerWrapper } = require("../../helpers");
const { validateBody, authenticate } = require("../../middlewares");
// const {registerSchema, loginSchema} = require("../../schemas");
const { schemas } = require("../../models/user");

const ctrl = require("../../controllers/Auth");

router.post(
  "/register",
  validateBody(schemas.registerSchema),
  controllerWrapper(ctrl.register)
);
router.post(
  "/login",
  validateBody(schemas.loginSchema),
  controllerWrapper(ctrl.login)
);
router.get("/logout", authenticate, controllerWrapper(ctrl.logout));

module.exports = router;
