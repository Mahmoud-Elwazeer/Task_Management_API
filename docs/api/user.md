## User Management

### Notes for Creating Users with Admin Role

1. **First-Time Setup**:
    - Set `NODE_ENV='dev'` in your `.env` file.
    - Use the **Create User** endpoint to create a user with the **Admin** role.
    - After creating the Admin user, change `NODE_ENV` back to `'prod'`.
2. **Creating Users with Other Roles**:
    - To create users with roles like **Manager** or **Admin**, first create the user with the default role.
    - Then, use the **Update User** endpoint (with an Admin account) to update the user's role.

### Create User

- **Endpoint**: `POST /users/sign-up`
- **Description**: Create a new user.
- **Request Body**:
    
    ```
    {
      "name": "Mahmoud Elwazeer",
      "email": "user1@gmail.com",
      "password": "User@123"
    }
    ```
    

### Get Current User

- **Endpoint**: `GET /users/me`
- **Description**: Get details of the currently authenticated user.

### Get User by ID

- **Endpoint**: `GET /users/{userId}`
- **Description**: Get details of a specific user by ID.

### Get All Users (Admin Only)

- **Endpoint**: `GET /users`
- **Description**: Get a list of all users (only accessible by Admin).
- **Query Parameters**:
    - `page`: Page number (default: 1).
    - `limit`: Number of items per page (default: 10).

### Update User by ID

- **Endpoint**: `PUT /users/{userId}`
- **Description**: Update user details by ID.
- **Request Body**:
    ```
    {
      "name": "Mahmoud Elwazeer",  // Optional
      "email": "test@gmail.com"    // Optional
    }
    ```
    
- **permission**: Admin & same user

### Delete User

- **Endpoint**: `DELETE /users/{userId}`
- **Description**: Delete a user by ID.
- **permission**: Admin & same user
