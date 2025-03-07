import express from 'express'
import authorize from './../middlewares/auth';
import { create, getOne, getAll, update, deleteOne } from '../controllers/task'
import { getTaskHistory, getTaskInteractions } from '../controllers/taskHistory'
import {  assignUserToTask, getTasksAssignedToUser,
        getUsersAssignedToTask, removeUserFromTask }
    from '../controllers/userTask'
import { createTaskComment, getTaskComments, deleteTaskComment } from '../controllers/taskComment';
import { 
    createTaskValidator, updateTaskValidator, TaskByIdValidator,
    getTasksValidator, assignTaskValidator,
    getUserTasksValidator, createCommentValidator,
    deleteCommentValidator
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

router.get('/:taskId/history', authorize(['Admin', 'Manager']), TaskByIdValidator, getTaskHistory);
router.get('/:taskId/interactions', authorize(['Admin', 'Manager']), TaskByIdValidator, getTaskInteractions);

router.route('/:taskId/comments')
    .post(authorize([]), createCommentValidator, createTaskComment)
    .get(authorize([]), TaskByIdValidator, getTaskComments)

router.delete('/:taskId/comments/:commentId', authorize([]), deleteCommentValidator, deleteTaskComment);

export { router as taskRoutes };
