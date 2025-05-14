/**
 * NodeTasker - A beginner-friendly Node.js project
 *
 * This project demonstrates core Node.js concepts:
 * - Non-blocking I/O
 * - File system operations
 * - Event-driven architecture
 * - HTTP and Express modules
 * - Routes and middleware
 * - JSON file-based storage
 * - Error handling
 *
 * Difficulty level: Easy to Medium
 */

// Import required modules
import express, { Request, Response } from "express";
import path from "path";
import chalk from "chalk";

// Import custom modules
import router from "./routes/TaskRoute";
import { errorHandler } from "./middleware/errorHandler";
import { setupTaskEventListeners } from "./events/taskEvents";

// Create Express application
const server = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST;

// Set up middleware
server.use(express.json()); // Parse JSON request bodies
server.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies
server.use(express.static("public")); // Serve static files from public directory

// Set up routes
server.use("/api/tasks", router);

// Serve the HTML interface
server.get("/", (request: Request, response: Response) => {
  response.sendFile(path.join(__dirname, "public", "index.html"));
});

// Error handling middleware (must be last)
server.use(errorHandler);

// Start the server
server.listen(PORT, () => {
  console.log(chalk.green.bold(`Server running on ${HOST}:${PORT}`));
  console.log(chalk.blue("API endpoints available at /api/tasks"));
  console.log(
    chalk.yellow(
      `Visit ${HOST}:${PORT} in your browser to use the web interface`
    )
  );
  console.log(
    chalk.yellow(
      `<=====================================================>`
    )
  );
});

// Set up event listeners for task events
setupTaskEventListeners();

// Handle unhandled promise rejections
process.on("unhandledRejection", (err: any) => {
  console.error(chalk.red("UNHANDLED REJECTION! 💥 Shutting down..."));
  console.error(chalk.red(err.name), err.message);
  process.exit(1);
});

// Handle SIGTERM signal (e.g., when Nodemon restarts)
process.on("SIGTERM", () => {
  console.log(chalk.yellow("👋 SIGTERM RECEIVED. Shutting down gracefully"));
  process.exit(0);
});
