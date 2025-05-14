/**
 * Task Routes
 *
 * Demonstrates:
 * - Express router
 * - Route parameters
 * - HTTP methods (GET, POST, PUT, DELETE)
 * - Controller pattern
 */

import express from "express";
import TaskController from "../controllers/TaskController";

const router = express.Router();

// prefix: tasks
router.get("/", TaskController.index);
router.get("/:id", TaskController.show);
router.post("/", TaskController.create);
router.put("/:id", TaskController.update);
router.delete("/:id", TaskController.delete);

export default router;
