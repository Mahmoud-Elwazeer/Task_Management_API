# Exchanges Endpoints

Most endpoints require authentication via a Bearer Token. The token can be obtained by logging in or refreshing the token.

### Login

- **Endpoint**: `POST /auth/login`
- **Description**: Authenticate a user and return an access token.
- **Request Body**:
    
    ```
    {
      "email": "user@gmail.com",
      "password": "User@123"
    }
    ```
    

### Refresh Token

- **Endpoint**: `POST /auth/token/refresh`
- **Description**: Refresh the access token using a refresh token.
- **Request Body**:
    
    ```
    {
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
    ```