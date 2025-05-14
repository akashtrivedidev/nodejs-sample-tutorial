/**
 * File Utilities
 *
 * Demonstrates:
 * - File system (fs) operations
 * - Promises and async/await
 * - Error handling
 * - Non-blocking I/O
 */
import fs from "fs/promises";
import path from "path";
import chalk from "chalk";
import { Task } from "../types/Task";

/**
 * Read a JSON file and parse its contents
 * @param {string} filePath - Path to the JSON file
 * @returns {Promise<Object|Array>} Parsed JSON data
 */
export const readJsonFile = async (filePath: string) => {
  try {
    // Read file asynchronously (non-blocking I/O)
    const data = await fs.readFile(filePath, "utf8");

    // Log successful file read
    console.log(
      chalk.blue(`📖 Successfully read from ${path.basename(filePath)}`)
    );

    // Parse and return the JSON data
    return JSON.parse(data);
  } catch (err: any) {
    // If file doesn't exist, throw the error for handling in the service
    if (err.code === "ENOENT") {
      console.log(
        chalk.yellow(`⚠️ File not found: ${path.basename(filePath)}`)
      );
      throw err;
    }

    // If JSON parsing fails, throw a more descriptive error
    if (err instanceof SyntaxError) {
      console.error(chalk.red(`❌ Invalid JSON in ${path.basename(filePath)}`));
      throw new Error(
        `Invalid JSON in ${path.basename(filePath)}: ${err.message}`
      );
    }

    // For any other errors, log and rethrow
    console.error(
      chalk.red(
        `❌ Error reading file ${path.basename(filePath)}: ${err.message}`
      )
    );
    throw err;
  }
};

/**
 * Write data to a JSON file
 * @param {string} filePath - Path to the JSON file
 * @param {Object|Array} data - Data to write
 * @returns {Promise<void>}
 */
export const writeJsonFile = async (filePath: string, data: Task[]) => {
  try {
    // Ensure the directory exists
    await ensureDirectoryExists(path.dirname(filePath));

    // Convert data to JSON string with pretty formatting
    const jsonString = JSON.stringify(data, null, 2);

    // Write to file asynchronously (non-blocking I/O)
    await fs.writeFile(filePath, jsonString);

    // Log successful write
    console.log(
      chalk.green(`💾 Successfully wrote to ${path.basename(filePath)}`)
    );
  } catch (err: any) {
    console.error(
      chalk.red(
        `❌ Error writing file ${path.basename(filePath)}: ${err.message}`
      )
    );
    throw err;
  }
};

/**
 * Ensure a directory exists, create if it doesn't
 * @param {string} dirPath - Path to the directory
 * @returns {Promise<void>}
 */
const ensureDirectoryExists = async (dirPath: string) => {
  try {
    await fs.access(dirPath);
  } catch (err: any) {
    // Directory doesn't exist, create it
    if (err.code === "ENOENT") {
      console.log(chalk.yellow(`📁 Creating directory: ${dirPath}`));
      await fs.mkdir(dirPath, { recursive: true });
    } else {
      throw err;
    }
  }
};
