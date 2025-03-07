# Task Management Api

<div align="center">
  <h3 align="center">Task Management Api</h3>
  <p align="center">
    A system for managing companies, departments, employees, and projects with a workflow for employee performance reviews.
    <br />
    <a href="https://github.com/Mahmoud-Elwazeer/Task_Management_API/issues">Report Bug</a>
    ·
    <a href="https://github.com/Mahmoud-Elwazeer/Task_Management_API/issues">Request Feature</a>
  </p>
</div>

---

## Overview

The **Task Management API** is a scalable, event-driven, and high-performance backend service built with TypeScript, Express.js, MongoDB, Redis, BullMQ, and RabbitMQ. It enables users to create, manage, and track tasks efficiently with role-based access control (RBAC), caching, background jobs, and event-driven architecture.

---

## Features

✅ **User Authentication & Authorization** (JWT, RBAC)

✅ **Task Creation, Assignment, and Management**

✅ **Task Comments & History Tracking**

✅ **Caching with Redis for Faster API Responses**

✅ **Event-Driven Architecture (Kafka, RabbitMQ)**

✅ **Background Job Processing with BullMQ**

✅ **Real-time Notifications for Task Updates**

---

## Documentation

For detailed documentation, refer to the following:

- **[API Documentation](docs/api/README.md)**: Detailed documentation for all API endpoints.
- **[Database Design](docs/database/README.md)**: Overview of the database schema, collections, and relationships.
- **[Architectural Decisions](docs/README.md)**: Key decisions and rationale behind the architecture of the Task Management API, including technology choices, design patterns, and scalability considerations.
- **Demo**: Explore the API in action using postman and this url. https://zimozi.elwazeer.tech

---


## **Tech Stack**

- **Backend:** TypeScript, Node.js, Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Caching & Queueing:** Redis, BullMQ
- **Message Brokers:** RabbitMQ
- **Authentication:** JWT-based Auth with Role-Based Access Control (RBAC)
- **Validation:** Zod for Input Validation
- **Containerization & Deployment:** Docker, CI/CD (GitHub Actions)

---

## Getting Started

## Installation

### 1. **Running Locally**

To run the application locally, follow these steps:

1. **Clone the repository**:
    ```
    git clone https://github.com/Mahmoud-Elwazeer/Task_Management_API.git
    ```
    
2. **Install dependencies**:
    ```
    npm install
    ```
    
3. **Set up environment variables**:
    - Copy the `.env.dev.example` file to `.env`:
        ```
        cp .env.dev.example .env
        ```
        
    - Update the `.env` file with your custom configuration (e.g., MongoDB URI, Redis host, etc.).
4. **Run the application in development mode**:
    ```
    npm run dev
    ```
    
---

### 2. **Running with Docker**

You can run the application using Docker. There are two options depending on whether you want to use a **local MongoDB instance** or **MongoDB Atlas (cloud)**.

### **Option 1: Local MongoDB**

1. **Set up environment variables**:
    - Copy the `.env.docker.example` file to `.env`:
        ```
        cp .env.docker.example .env
        ```
        
    - Update the `.env` file with your custom configuration.
2. **Run the application**:
    - For **development mode**, use:
        ```
        docker-compose -f docker-compose.local.yml --profile development up --build
        ```
        
    - For **production mode**, use:
        ```
        docker-compose -f docker-compose.local.yml --profile production up --build
        ```
        

### **Option 2: MongoDB Atlas (Cloud)**

1. **Set up environment variables**:
    - Copy the `.env.docker.example` file to `.env`:
        ```
        cp .env.docker.example .env
        ```
        
    - Update the `.env` file with your MongoDB Atlas connection string and other configurations.
2. **Run the application**:
    - For **development mode**, use:
        ```
        docker-compose --profile development up --build
        ```
        
    - For **production mode**, use:
        ```
        docker-compose --profile production up --build
        ```
        

---

## Docker Compose Profiles

- **Development Mode** (`-profile development`):
    - Runs the application in development mode with hot-reloading.
    - Uses a local MongoDB instance (if applicable).
    - Enables debugging tools.
- **Production Mode** (`-profile production`):
    - Runs the application in production mode.
    - Optimized for performance and security.
    - Uses MongoDB Atlas or a local MongoDB instance (depending on your configuration).

## **CI/CD (GitHub Actions)**

- Auto deployment setup using **GitHub Actions & Docker**.
- Triggers on **push to main** branch.

---

## **Security Enhancements**

- **Decision:** Implemented security best practices to protect the API.
- **Justification:**
    - **JWT-based authentication** secures access to the API.
    - **Role-Based Access Control (RBAC)** ensures users can only perform actions allowed by their role.
    - **Rate limiting applied to public endpoints** using middleware to prevent excessive requests and protect against **Denial of Service (DoS) attacks**.
    - **Input validation & sanitization using Zod** to prevent injection attacks.
    - **Used secure HTTP headers** to protect against XSS, CSRF, and clickjacking attacks.

---

## **Rate Limiting for API Protection**

- **Decision:** Used rate limiting on public API endpoints.
- **Justification:**
    - Prevents **Denial of Service (DoS) attacks** and **brute-force attempts** on authentication endpoints.
    - Ensures fair usage and prevents API abuse.
    - Implemented using **Express Rate Limit** middleware to **restrict the number of requests per IP**.

## **Conclusion**

This **Task Management API** is designed for **scalability, performance, and maintainability**. It utilizes **modern technologies like Redis, Kafka, RabbitMQ, and BullMQ** to handle real-time notifications, background jobs, and event-driven workflows efficiently.

📌 **Built with ❤️ by [Mahmoud Elwazeer]** 🚀