# **Architectural Decisions for Task Management API**

## **Database: MongoDB with Mongoose**

- **Decision:** Chose **MongoDB** as the primary database due to its flexibility in handling dynamic data structures. Used **Mongoose** as the ORM for schema enforcement and data validation.
- **Justification:**
    - NoSQL provides better scalability for task-based applications.
    - Allows storing hierarchical task-related data efficiently (e.g., tasks, comments, history, notifications).
    - **Indexing** improves query performance on frequently accessed collections.

---

## **API Development: TypeScript, Express.js, and Zod**

- **Decision:** Used **TypeScript** for type safety and **Express.js** for handling API routes. Applied **Zod** for request validation.
- **Justification:**
    - TypeScript helps catch errors at compile time, improving maintainability.
    - Express.js is lightweight and easy to extend with middleware.
    - **Zod ensures strict request validation**, preventing bad data from entering the system.

---

## **Authentication & Authorization: JWT & Role-Based Access Control (RBAC)**

- **Decision:** Implemented **JWT (JSON Web Token)** for authentication and **RBAC** to enforce access control.
- **Justification:**
    - JWT allows stateless authentication, reducing database load.
    - RBAC ensures **Admins, Managers, and Users** have different permissions for security.
    - Middleware checks user roles before allowing access to sensitive routes.

---

## **Task Management & Audit Logging**

- **Decision:** Used **separate collections** for **tasks**, **task assignments**, and **task history**.
- **Justification:**
    - **Task history** ensures all changes (creation, updates, comments, assignments) are tracked for auditing.
    - **Task assignments (`UserTask` schema)** ensures **many-to-many relationships** between users and tasks.
    - **Aggregation queries** allow fetching complete task interaction logs efficiently.

---

## **Caching & Performance Optimization**

- **Decision:** Integrated **Redis** to cache frequently accessed data (e.g., `GET /tasks/user/{userId}`) and **BullMQ** for background job processing.
- **Justification:**
    - Redis significantly reduces response times for **read-heavy operations**.
    - **Implemented cache invalidation** to clear Redis cache on task updates.
    - **BullMQ handles heavy processing tasks** (e.g., sending notifications) asynchronously.

---

## **Event-Driven Architecture: RabbitMQ for Asynchronous Processing**

- **Decision:** Integrated **RabbitMQ** to handle event-driven messaging for real-time notifications and background processing.
- **Justification:**
    - **RabbitMQ ensures reliable messaging** between microservices.
    - Used **queues for event-based processing**, such as task creation, assignment, and deletion.
    - **Consumers process queued messages** for **notifications, logging, and system-wide updates**.

---

## **Notification System (BullMQ & RabbitMQ)**

- **Decision:** Implemented **BullMQ** (Redis-based queue) for task notifications and **RabbitMQ** for event-driven processing.
- **Justification:**
    - **BullMQ enables background processing** of notifications (avoiding API slowdowns).
    - **RabbitMQ consumers process task-related events** (e.g., task updates, assignments) for system-wide consistency.

---

## **Task Comments & History Tracking**

- **Decision:** Implemented **task comments** separately while linking them to **task history** for tracking all interactions.
- **Justification:**
    - **Separate comments collection** improves query efficiency and allows better indexing.
    - **Task history tracks every significant change** (CREATED, UPDATED, DELETED, COMMENTED, COMMENT_DELETED, ASSIGNED, UNASSIGNED).
    - Comments are **linked to tasks and task history** to maintain a full record of discussions and changes.

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

---

# **Conclusion**

This architecture ensures:

**Scalability** (MongoDB + Redis + RabbitMQ)

**Performance** (Redis caching + BullMQ for background tasks)

**Real-time Event Processing** (RabbitMQ)

**Security** (JWT + RBAC + Rate Limiting)

**Event-Driven Design** (RabbitMQ for async processing)