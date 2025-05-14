/**
 * Task Controller
 *
 * Demonstrates:
 * - Request handling
 * - Response formatting
 * - Error handling with try/catch
 * - Service pattern (separation of concerns)
 */

import { NextFunction, Request, Response } from "express";
import TaskServiceFactory from "../factory/TaskServiceFactory";
import { TaskEvent } from "../events/taskEvents";

export default class TaskController {
  static async index(request: Request, response: Response, next: NextFunction) {
    try {
      // get all tasks, there may be different implementations based on the system used for saving the tasks.
      let taskService = TaskServiceFactory.createService();
      console.log(taskService);

      const tasks = await taskService.findAll();
      response.status(200).json({
        status: "success",
        results: tasks.length,
        data: { tasks },
      });
    } catch (err) {
      next(err);
    }
  }

  static async show(request: Request, response: Response, next: NextFunction) {
    try {
      let taskService = TaskServiceFactory.createService();
      const task = await taskService.find(request.params.id);

      if (!task) {
        const error = new Error(`Task with ID ${request.params.id} not found`);
        response.statusCode = 404;
        return next(error);
      }

      response.status(200).json({
        status: "success",
        data: { task },
      });
    } catch (err) {
      next(err);
    }
  }

  static async create(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const {
        title,
        description,
        priority = "medium",
        completed = false,
      } = request.body;

      // Validate input
      if (!title) {
        const error = new Error("Title is required");
        return next(error);
      }
      let taskService = TaskServiceFactory.createService();

      const newTask = await taskService.create(
        title,
        description,
        priority,
        completed
      );

      // Emit task created event
      TaskEvent.emit("taskCreated", newTask);

      response.status(201).json({
        status: "success",
        data: { task: newTask },
      });
    } catch (err) {
      next(err);
    }
  }

  static async update(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      let taskService = TaskServiceFactory.createService();
      const updatedTask = await taskService.update(
        request.params.id,
        request.body
      );

      if (!updatedTask) {
        const error = new Error(`Task with ID ${request.params.id} not found`);
        return next(error);
      }

      // Emit task updated event
      TaskEvent.emit("taskUpdated", updatedTask);

      response.status(200).json({
        status: "success",
        data: { task: updatedTask },
      });
    } catch (err) {
      next(err);
    }
  }

  static async delete(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      let taskService = TaskServiceFactory.createService();
      const deletedTask = await taskService.delete(request.params.id);

      if (!deletedTask) {
        const error = new Error(`Task with ID ${request.params.id} not found`);
        // error.statusCode = 404;
        return next(error);
      }

      // Emit task deleted event
      TaskEvent.emit("taskDeleted", deletedTask);

      response.status(200).json({
        status: "success",
        data: null,
      });
    } catch (err) {
      next(err);
    }
  }
}
