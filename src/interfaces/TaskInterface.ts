import { Task } from "../types/Task";

enum TaskStatus {
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}

enum TaskPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

export interface TaskInterface {
  create(
    title: string,
    description: string,
    priority: string,
    completed: boolean
  ): Promise<Task | null>;
  find(id: string): Promise<Task | null>;
  findAll(): Promise<Task[] | []>;
  update(id: string, task: Task): Promise<Task | null>;
  delete(id: string): Promise<boolean | null>;
}
