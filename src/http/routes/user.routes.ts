import { Router } from 'express';
import UserController from '../../controllers/user.controller';

const usersRouter = Router();
const userController = new UserController();

usersRouter.post('/', userController.create);
usersRouter.get('/', userController.findAll);
usersRouter.get('/:id', userController.find);
usersRouter.put('/:id', userController.update);
usersRouter.delete('/:id', userController.delete);

export default usersRouter;