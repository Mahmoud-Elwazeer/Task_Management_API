## User Task Management

### Assign Task to User (Admin & Manager)

- **Endpoint**: `POST /tasks/assign`
- **Description**: Assign a task to a user.
- **Request Body**:
    ```
    {
      "taskId": "67cae465bf4fbb1ce7bf6ba3",
      "userId": "67c8eca1bd2b27e87feae54b"
    }
    ```
    

### Get All Tasks Assigned to a User

- **Endpoint**: `GET /tasks/user/{userId}`
- **Description**: Get all tasks assigned to a specific user.
- **permission**: all users
- **Query Parameters**:
    - `page`: Page number (default: 1).
    - `limit`: Number of items per page (default: 10).
    - `status`: Filter by status (e.g., "In Progress").
    - `priority`: Filter by priority (e.g., "Medium").
    - `dueDate`: Filter by due date (e.g., "03-25-2025").

### Get Users Assigned to a Task

- **Endpoint**: `GET /tasks/{taskId}/users`
- **Description**: Get all users assigned to a specific task.
- **permission**: all users

### Remove User from Task (Admin & Manager)

- **Endpoint**: `DELETE /tasks/user/unassign`
- **Description**: Remove a user from a task.
- **Request Body**:
    
    ```
    {
      "taskId": "67c9af28612f135d9e0b189b",
      "userId": "67c8ed2abd2b27e87feae551"
    }
    ```