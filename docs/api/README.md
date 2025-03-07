# API Documentation

This API provides endpoints for managing tasks, users, comments, notifications, and more. Below is the detailed documentation for each endpoint. etc..

## Base URL
All endpoints are relative to the base URL:
```
{{base_url}}
```
**For live demo:**

    https://zimozi.elwazeer.tech

## Endpoints Overview

1. [**Authentication**](https://./auth.md):
    - Endpoints for user authentication and token management.
    - Includes login and token refresh functionality.
2. [**User Management**](./user.md):
    - CRUD operations for users.
    - Create, read, update, and delete users.
    - Admin-specific endpoints for managing user roles.
3. [**Task Management**](./task.md):
    - CRUD operations for tasks.
    - Create, read, update, and delete tasks.
    - Admin and Manager-specific endpoints for task management.
4. [**User Task Management**](./userTask.md):
    - Assign and unassign tasks to users.
    - Fetch tasks assigned to a specific user.
    - Fetch users assigned to a specific task.
5. [**Task History**](./taskHistory.md):
    - Fetch task history and interactions.
    - Track changes and updates made to tasks.
6. [**Task Comment**](./taskComment.md):
    - Add, fetch, and delete comments on tasks.
    - Manage task-related discussions.
7. [**Notification**](./notification.md):
    - Fetch user notifications.
    - Mark notifications as read.

For more details, refer to the specific sections for each endpoint below.

---

## Error Handling

For a detailed overview of error responses and handling, refer to the [Error Documentation](./errors.md).

## Postman Collection
You can find the Postman collection for the API in the backend directory under the file name `task_management.postman_collection.json`.

For more details, refer to the specific sections for each endpoint below.




