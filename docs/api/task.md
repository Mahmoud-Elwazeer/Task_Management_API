## Task Management

### Create Task (Admin & Manager)

- **Endpoint**: `POST /tasks`
- **Description**: Create a new task.
- **Request Body**:
    
    ```
    {
      "title": "Task 1",
      "description": "First Task",
      "priority": "Medium",  // Optional: Low, Medium, High (default: Low)
      "dueDate": "03-15-2025"
    }
    ```
    

### Get Task by ID

- **Endpoint**: `GET /tasks/{taskId}`
- **Description**: Get details of a specific task by ID.
- **permission**: all users

### Get All Tasks (Admin & Manager)

- **Endpoint**: `GET /tasks`
- **Description**: Get a list of all tasks (only accessible by Admin & Manager).
- **Query Parameters**:
    - `page`: Page number (default: 1).
    - `limit`: Number of items per page (default: 10).
    - `status`: Filter by status (e.g., "In Progress").
    - `priority`: Filter by priority (e.g., "Medium").
    - `dueDate`: Filter by due date (e.g., "03-25-2025").

### Update Task by ID (Admin & Manager)

- **Endpoint**: `PUT /tasks/{taskId}`
- **Description**: Update task details by ID.
- **Request Body**:
    
    ```
    {
      "title": "Task 2",  // Optional
      "description": "Second Task",  // Optional
      "status": "In Progress",  // Optional: ["Pending", "In Progress", "Completed"]
      "priority": "Medium"  // Optional: ["Low", "Medium", "High"]
    }
    ```
    

### Delete Task (Admin Only)

- **Endpoint**: `DELETE /tasks/{taskId}`
- **Description**: Delete a task by ID.