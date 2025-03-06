import express from 'express'
import authorize from './../middlewares/auth';
import { 
    create, getOne, getAll, update, deleteOne,
    assignUserToTask, getTasksAssignedToUser,
    getUsersAssignedToTask, removeUserFromTask
} from '../controllers/task'
import { 
    createTaskValidator, updateTaskValidator, TaskByIdValidator,
    getTasksValidator, assignTaskValidator,
    getUserTasksValidator
} from '../validations/task';

const router = express.Router();

router.route('/')
    .post(authorize(['Admin', 'Manager']), createTaskValidator, create)
    .get(authorize(['Admin', 'Manager']), getTasksValidator, getAll)

router.route('/:taskId')
    .get(authorize([]), TaskByIdValidator, getOne)
    .put(authorize(['Admin', 'Manager']), updateTaskValidator, update)
    .delete(authorize(['Admin']), TaskByIdValidator, deleteOne)

router.post("/assign", authorize(['Admin', "manager"]), assignTaskValidator, assignUserToTask);

router.get('/user/:userId', authorize([]), getUserTasksValidator, getTasksAssignedToUser);
router.get("/:taskId/users", authorize([]), TaskByIdValidator, getUsersAssignedToTask);

router.delete("/user/unassign", authorize(['Admin', "manager"]), assignTaskValidator, removeUserFromTask);

export { router as taskRoutes };
