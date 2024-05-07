import { Router } from 'express';
import { CartController } from '../controller/cart.controller.js';
import { authenticationMiddleware } from '../middlewares/authentication.js';

export const cartRouter = Router();
export const cartControll = new CartController();

cartRouter.get('/', cartControll.getCart);

cartRouter.post('/', authenticationMiddleware, cartControll.createCart);

cartRouter.patch('/:id', authenticationMiddleware, cartControll.updateCart);

cartRouter.delete('/:id', authenticationMiddleware, cartControll.deleteCart);