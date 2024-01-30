import { Router } from 'express';
import { createUser, editUser } from '../controllers/userController';
const router = Router();

router.post('/new', createUser);
router.post('/edit/:userId', editUser);

export { router as userRoutes };
