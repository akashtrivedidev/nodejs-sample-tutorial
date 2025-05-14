/**
 * Error Handler Middleware
 *
 * Demonstrates:
 * - Express error middleware
 * - Error handling and response formatting
 * - Environment-based error details
 */

import chalk from "chalk";
import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Default status code and message
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  // Log the error for server-side debugging
  console.error(chalk.red("🔥 ERROR:"), chalk.red(err.message));
  if (process.env.NODE_ENV !== "production") {
    console.error(chalk.gray(err.stack));
  }

  // Send appropriate response to client
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    // Include stack trace in development, not in production
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
};
