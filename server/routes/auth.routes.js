import { Router } from "express";
import {
  login,
  register,
  logout,
  profile,
  verifyToken
} from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator-middleware.js";
import { loginSchemma, registerSchema } from "../schemas/auth.schema.js";

const router = Router();

router.post("/api/register", validateSchema(registerSchema), register);

router.post("/api/login", validateSchema(loginSchemma), login);

router.post("/api/logout", logout);

router.get("/api/profile", authRequired, profile);

router.get("/api/verify-token", verifyToken);

export default router;
