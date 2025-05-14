import chalk from "chalk";
import { FileTaskRepository } from "../repositories/FileTaskRepository";
import { MySQLTaskRepository } from "../repositories/MySQLTaskRepository";
import { TaskService } from "../services/TaskService";

export default class TaskServiceFactory {
  constructor() {}
  static createService(): TaskService {
    // this manages the dependencies related to handling the task service
    let taskService = null;
    
    // process.env.NODE_ENV==undefined
    if (process.env.NODE_ENV == "development" || true) {
      taskService = new TaskService(new FileTaskRepository());
    } else {
      taskService = new TaskService(new MySQLTaskRepository());
    }
    console.log(chalk.green.bold(`TaskService intialized from factory`));
    
    return taskService;
  }
}
