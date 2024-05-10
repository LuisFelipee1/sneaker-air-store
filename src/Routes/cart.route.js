import { Router } from 'express';
import { CartController } from '../controller/cart.controller.js';
import { authenticationMiddleware } from '../middlewares/authentication.js';

export const cartRouter = Router();
export const cartControll = new CartController();

cartRouter.get('/closed', cartControll.getCarts);

cartRouter.post('/', authenticationMiddleware, cartControll.createCart);

cartRouter.get('/', cartControll.getCart);

cartRouter.patch('/', authenticationMiddleware, cartControll.updateCart);

cartRouter.delete('/:productId', authenticationMiddleware, cartControll.deleteCart);