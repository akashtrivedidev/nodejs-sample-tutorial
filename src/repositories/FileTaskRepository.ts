import { TaskInterface } from "../interfaces/TaskInterface";
import { Task } from "../types/Task";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import { readJsonFile, writeJsonFile } from "../utils/FileUtils";

const TASKS_FILE = path.join(__dirname, "../data/tasks.json");

export class FileTaskRepository implements TaskInterface {
  constructor() {}

  async find(id: string) {
    let task = null;
    const tasks = await this.findAll();
    if (tasks) {
      for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].title) {
          task = tasks[i];
        }
      }
    }
    return task;
  }

  async findAll(): Promise<Task[] | []> {
    try {
      const tasks = await readJsonFile(TASKS_FILE);
      return tasks;
    } catch (error: any) {
      // If file doesn't exist yet, return empty array
      if (error.code === "ENOENT") {
        return [];
      }
      throw error;
    }
  }

  async create(
    title: string,
    description: string,
    priority: string,
    completed: boolean
  ): Promise<Task> {
    const tasks = await this.findAll();

    const newTask: Task = {
      id: uuidv4(),
      title: title,
      description: description || "",
      priority: priority || "medium",
      completed: completed || false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // tasks.push(newTask);
    await writeJsonFile(TASKS_FILE, tasks);

    return newTask;
  }

  async update(id: string, task: Task) {
    const tasks = await this.findAll();
    const taskIndex = tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) return null;

    const updatedTask = {
      ...tasks[taskIndex],
      ...task,
      updatedAt: new Date().toISOString(),
    };

    tasks[taskIndex] = updatedTask;
    await writeJsonFile(TASKS_FILE, tasks);

    return updatedTask;
  }

  async delete(id: string) {
    const tasks = await this.findAll();
    const taskIndex = tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) return null;

    const deletedTask = tasks[taskIndex];
    tasks.splice(taskIndex, 1);

    await writeJsonFile(TASKS_FILE, tasks);

    return true;
  }
}
