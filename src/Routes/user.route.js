import { Router } from 'express';
import { UsersController } from '../controller/user.controller.js'
import { authenticationMiddleware } from '../middlewares/authentication.js';

export const usersRoute = Router();
export const userscontroll = new UsersController();

usersRoute.post('/', userscontroll.createUser);

usersRoute.get('/', authenticationMiddleware, userscontroll.geAllUsers);

usersRoute.patch('/', authenticationMiddleware, userscontroll.updateUser);

usersRoute.delete('/', authenticationMiddleware, userscontroll.deleteUser);
