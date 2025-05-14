# NodeTasker - A Task Management API for Learning Node.js

NodeTasker is a beginner-friendly Node.js project designed to help new developers understand core Node.js concepts through a practical example: a task management API.

## What You'll Learn

This project demonstrates these key Node.js concepts:

- **Non-blocking I/O**: Asynchronous file operations
- **File system operations**: Reading and writing to JSON files
- **Event-driven architecture**: Custom event emitters and listeners
- **HTTP and Express**: Building a RESTful API
- **Routes and middleware**: Organizing API endpoints and adding cross-cutting concerns
- **JSON file-based storage**: Simple data persistence without a database
- **Error handling**: Comprehensive error management

## Difficulty Level: Easy to Medium

This project is suitable for beginners who have basic JavaScript knowledge and want to learn Node.js fundamentals.

## Project Features

- Create, read, update, and delete tasks
- Mark tasks as complete/incomplete
- Set task priorities
- Search and filter tasks
- Simple web interface for API testing
- Colorful console output for server events

## Getting Started

1. Clone the repository
2. Install dependencies with `npm install`
3. Start the server with `npm start` or `npm run dev` for development

The server will be available at http://localhost:3000.

## Project Structure

```
node-tasker/
│
├── index.js                 - Main entry point
├── package.json             - Project metadata and dependencies
│
├── src/
│   ├── controllers/         - Request handlers
│   │   └── taskController.js
│   │
│   ├── data/                - Data storage
│   │   └── tasks.json       - JSON file for task storage
│   │
│   ├── events/              - Event handlers
│   │   └── taskEvents.js    - Custom event emitter for tasks
│   │
│   ├── middleware/          - Express middleware
│   │   └── errorHandler.js  - Error handling middleware
│   │
│   ├── routes/              - API routes
│   │   └── taskRoutes.js    - Task-related routes
│   │
│   ├── services/            - Business logic
│   │   └── taskService.js   - Task operations
│   │
│   └── utils/               - Utility functions
│       └── fileUtils.js     - File system operations
│
└── public/                  - Static assets
    └── index.html           - Simple frontend for API testing
```

## Extension Ideas

Here are some ways to extend this project and learn more Node.js concepts:

1. **Add Authentication**: Implement user accounts and JWT authentication
2. **Task Categories**: Add the ability to categorize tasks
3. **Due Dates & Reminders**: Add scheduling functionality using cron jobs
4. **Database Integration**: Migrate from JSON files to MongoDB or PostgreSQL
5. **WebSockets**: Add real-time updates using Socket.io
6. **Testing**: Add unit and integration tests using Jest or Mocha
7. **API Documentation**: Generate API docs using Swagger or similar tools
8. **Docker**: Containerize the application for easier deployment

## API Endpoints

- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get a specific task
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## License

MIT