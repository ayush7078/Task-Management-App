# Task Management App

This is a simple **Task Management App** built using ReactJS (for frontend) and a mock API (backend simulation). The application allows users to register, log in, manage tasks (add, update, delete, mark as complete), and store data using local state and mock API calls.

## Features

### User Authentication:
- Registration and Login screens.
- User credentials are stored in-memory (simulated).
- Form validation for fields like email and password.
- Persistent login using `localStorage`.

### Task Management:
- Users can add, edit, delete, and mark tasks as complete.
- Task state is managed using the React Context API.
- Simple animations for task additions and deletions.

### Mock API Integration:
- Mock API to simulate task CRUD operations:
  - `POST /register` to register a new user.
  - `POST /login` to validate login credentials.
  - `GET /tasks` to fetch tasks for the authenticated user.
  - `POST /tasks` to add a new task.
  - `PUT /tasks/:id` to mark a task as complete.
  - `DELETE /tasks/:id` to delete a task.
- Simulated API response delays using `setTimeout()` for realistic behavior.

### Data Persistence:
- Tasks are stored in the browser's `localStorage` to persist across sessions.
- User session data is also stored in `localStorage` for persistent login.

## Installation

### Prerequisites:
- [Node.js](https://nodejs.org/) (version 14.x or later)
- [npm](https://www.npmjs.com/get-npm) (comes with Node.js)

### Steps to run the project:
1. Clone the repository:

   ```bash
   git clone https://github.com/ayush7078/Task-Management-App.git
