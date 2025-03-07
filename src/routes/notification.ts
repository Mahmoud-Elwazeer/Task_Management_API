import express from 'express'
import authorize from './../middlewares/auth';
import { getUserNotic, markNotificationAsRead } from '../controllers/notification';

const router = express.Router();

router.get('/', authorize([]), getUserNotic);
router.patch('/:notificationId/read', authorize([]), markNotificationAsRead);

export { router as notificationRoutes };
