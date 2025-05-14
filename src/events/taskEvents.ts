/**
 * Task Events
 *
 * Demonstrates:
 * - Event-driven architecture
 * - EventEmitter pattern
 * - Observer pattern
 */

import EventEmitter from "events";
import chalk from "chalk";

// Create a custom event emitter for task events
export const TaskEvent = new EventEmitter();

// Set up event listeners for task events
export const setupTaskEventListeners = () => {
  // Task created event
  TaskEvent.on("taskCreated", (task) => {
    console.log(
      chalk.green.bold("🎉 EVENT:"),
      chalk.green(`New task created: "${task.title}" (ID: ${task.id})`)
    );
  });

  // Task updated event
  TaskEvent.on("taskUpdated", (task) => {
    console.log(
      chalk.blue.bold("📝 EVENT:"),
      chalk.blue(`Task updated: "${task.title}" (ID: ${task.id})`)
    );
  });

  // Task deleted event
  TaskEvent.on("taskDeleted", (task) => {
    console.log(
      chalk.yellow.bold("🗑️ EVENT:"),
      chalk.yellow(`Task deleted: "${task.title}" (ID: ${task.id})`)
    );
  });

  // Task completed event
  TaskEvent.on("taskCompleted", (task) => {
    console.log(
      chalk.magenta.bold("✅ EVENT:"),
      chalk.magenta(`Task completed: "${task.title}" (ID: ${task.id})`)
    );

    // This could trigger other actions like notifications
    // or analytics in a real-world application
  });

  // Error handling for the event emitter
  TaskEvent.on("error", (error) => {
    console.error(chalk.red.bold("❌ EVENT ERROR:"), chalk.red(error.message));
  });
};
