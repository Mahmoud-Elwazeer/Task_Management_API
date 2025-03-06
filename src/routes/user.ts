import express from 'express'
import authorize from './../middlewares/auth';
import { create, getCurrentUser, getOne, getAll, update,  deleteOne } from '../controllers/user'
import { createUserValidator, updateUserValidator } from '../validations/user';

const router = express.Router();

router.post('/sign-up', createUserValidator, create);

router.get('/', authorize(['Admin']), getAll);

router.get('/me', authorize([]), getCurrentUser);

router.route('/:userId')
    .get(authorize([]), getOne)
    .put(authorize([]), updateUserValidator, update)
    .delete(authorize([]), deleteOne)

export { router as userRoutes };
