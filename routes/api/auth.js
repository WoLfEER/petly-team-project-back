const express = require("express");
const router = express.Router();
const { controllerWrapper } = require("../../helpers");

const { validateBody, authenticate, passport } = require("../../middlewares");
const ctrl = require("../../controllers/Auth");
const { schemas } = require("../../models/user");

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
router.post(
  "/restore",
  validateBody(schemas.refreshPassSchema),
  controllerWrapper(ctrl.refreshPass)
);
router.get("/logout", authenticate, controllerWrapper(ctrl.logout));
router.post(
  "/refresh",
  validateBody(schemas.refreshSchema),
  controllerWrapper(ctrl.refresh)
);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google-redirect",
  passport.authenticate("google", { session: false }),
  ctrl.googleAuth
);

module.exports = router;
