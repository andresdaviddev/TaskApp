import { Router } from "express";
import {
  getTasks,
  getTask,
  createTasks,
  deleteTasks,
  updateTasks,
} from "../controllers/task.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator-middleware.js";
import { createTaskSchema } from "../schemas/task.schema.js";

const router = Router();

router.get("/api/tasks", authRequired, getTasks);
router.get("/api/tasks/:id", authRequired, getTask);
router.post(
  "/api/tasks",
  authRequired,
  // validateSchema(createTaskSchema),
  createTasks
);
router.delete("/api/tasks/:id", authRequired, deleteTasks);
router.put("/api/tasks/:id", authRequired, updateTasks);

export default router;
