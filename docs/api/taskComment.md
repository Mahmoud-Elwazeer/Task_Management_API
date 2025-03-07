## Task Comments

### Create Comment on Task

- **Endpoint**: `POST /tasks/{taskId}/comments`
- **Description**: Add a comment to a task.
- **Request Body**:
    
    ```
    {
      "comment": "Comment on Task"
    }
    ```
    
- **permission**: Admin, Manager, assigned people for this task

### Get All Comments for a Task

- **Endpoint**: `GET /tasks/{taskId}/comments`
- **Description**: Get all comments for a specific task.
- **permission**: Admin, Manager, assigned people for this task

### Delete Comment for a Task

- **Endpoint**: `DELETE /tasks/{taskId}/comments/{commentId}`
- **Description**: Delete a comment by ID.
- **permission**: Admin, Manager, & user who make this comment
