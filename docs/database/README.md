# **Database Design & Query Optimization**

## **Database Design (MongoDB)**

Our project uses **MongoDB** as the primary database, designed to support **high-performance** task management with features like **RBAC, audit logging, notifications, and caching**.

### **Key Collections & Schema Design**

1. **Users (`users` Collection)**
    - Stores **user information** with authentication details.
    - Uses **indexes** on `email` for fast lookup and uniqueness.
    - **Indexes:**
        
        ```
        UserSchema.index({ email: 1 }, { unique: true });
        UserSchema.index({ email: 1 });
        
        ```
        
2. **Tasks (`tasks` Collection)**
    - Stores **task details**, status, and assignments.
    - Optimized with **indexes on frequently queried fields**.
    - **Indexes:**
        
        ```
        TaskSchema.index({ createdBy: 1 });
        TaskSchema.index({ status: 1 });
        TaskSchema.index({ dueDate: 1 });
        TaskSchema.index({ priority: 1 });
        
        ```
        
3. **Task History (`taskhistories` Collection)**
    - Stores **audit logs** for tasks, tracking changes.
    - **Indexes:**
        
        ```
        TaskHistorySchema.index({ taskId: 1, createdAt: -1 });
        TaskHistorySchema.index({ userId: 1 });
        TaskHistorySchema.index({ action: 1 }); 
        
        ```
        
4. **Notifications (`notifications` Collection)**
    - Stores **user notifications** for task events.
    - Uses **Redis-based BullMQ for async processing**.
    - **Indexes:**
        
        ```
        NotificationSchema.index({ userId: 1, isRead: 1 });
        
        ```
        
5. **Task Comments (`taskcomments` Collection)**
    - Stores **comments on tasks**.
    - **Indexes:**
        
        ```
        TaskCommentSchema.index({ taskId: 1, createdAt: -1 });
        TaskCommentSchema.index({ userId: 1 }); 
        
        ```
        
6. **User-Task Assignments (`usertasks` Collection)**
    - Manages **many-to-many relationships** between users and tasks.
    - **Indexes:**
        
        ```
        UserTaskSchema.index({ userId: 1, taskId: 1 }, { unique: true }); // Prevent duplicate assignments

        userTaskSchema.index({ userId: 1 }); // Fetch all tasks assigned to a user
        userTaskSchema.index({ taskId: 1 }); 
        ```
        

### ** Database Optimization Techniques**

**Denormalization & Embedding**

- We embed **task comments** inside `taskcomments` collection instead of storing in `tasks`.
- **Reason**: Comments grow dynamically, and embedding in `tasks` would make updates expensive.

**Partitioning & Sharding** (for future scalability)

- **Sharding tasks collection by `createdBy` (User ID)** to distribute load efficiently.

**Caching with Redis**

- Frequently accessed queries (e.g., `GET /tasks/user/{userId}`) are **cached** in **Redis**.

**Write-Optimized Indexing**

- Avoid **excessive indexes**, balancing **read & write performance**.

---

## **Query Optimization in MongoDB**

## **Redis Caching & Performance Optimization**

### **Implemented Optimizations**

**API Caching with Redis**

- Example: Cache `GET /tasks/user/{userId}` for **1h**:

**Cache Invalidation**

- When a task is updated or deleted, or assign or unassign user for this task **remove the cache**:


**Background Job Processing with BullMQ**

- Sends async **task notifications**:

```
await notificationQueue.add("taskEvent", {
    type: "TASK_CREATED",
    taskId: task._id,
    userId: task.createdBy,
});

```

---

## **Event-Driven Architecture with RabbitMQ**

**Implemented RabbitMQ for Task Events**

- **Producer** (Publishes events when tasks are created/updated)
- **Consumer** (Listens for events & triggers notifications)

**Example: Publish Event when Task is Created**

```
channel.publish("task_events", "task.created", Buffer.from(JSON.stringify({ taskId })));

```

 **Consumer (Listening for Events)**

```
channel.consume("task_events", async (msg) => {
    const event = JSON.parse(msg.content.toString());
    console.log(`Received event: ${event.type}`);
});

```
