## Notifications

### Get User Notifications

- **Endpoint**: `GET /notifications`
- **Description**: Get all notifications for the authenticated user.

### Mark Notification as Read

- **Endpoint**: `PATCH /notifications/{notificationId}/read`
- **Description**: Mark a notification as read.
- **permission**: Admin, Manager, & user who make this comment
