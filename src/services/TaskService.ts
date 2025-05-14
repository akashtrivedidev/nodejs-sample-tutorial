/**
 * Task Service
 *
 * Demonstrates:
 * - Business logic separation
 * - Async/await with promises
 * - File system operations
 * - Error handling
 */

import { TaskInterface } from "../interfaces/TaskInterface";

// TaskService is dependent on TaskService
export class TaskService {
  private service: TaskInterface;
  constructor(dependency: any) {
    this.service = dependency;
  }

  async find(id: string) {
    return this.service.find(id);
  }

  async findAll() {
    return this.service.findAll();
  }

  async create(
    title: string,
    description: string,
    priority: string,
    completed: boolean
  ) {
    return this.service.create(title, description, priority, completed);
  }

  async update(id: string, task: any) {
    return this.service.update(id, task);
  }

  async delete(id: string) {
    return this.service.delete(id);
  }
}
