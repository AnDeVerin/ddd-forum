import { Router } from 'express';
import {
  createUser,
  editUser,
  getUserByEmail,
} from '../controllers/userController';
const router = Router();

router.get('/', getUserByEmail);
router.post('/new', createUser);
router.post('/edit/:userId', editUser);

export { router as userRoutes };
