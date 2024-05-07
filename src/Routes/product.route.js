import { Router } from 'express';
import { ProductsController } from '../controller/products.controller.js';
import { authenticationMiddleware } from '../middlewares/authentication.js';
import { adminCheckMiddleware } from '../middlewares/adminCheckMiddleware.js';

export const productsRouter = Router();
export const sessionControll = new ProductsController();

productsRouter.get('/', sessionControll.getProducts);

productsRouter.post('/', authenticationMiddleware, adminCheckMiddleware, sessionControll.createProduct);

productsRouter.patch('/:id', authenticationMiddleware, adminCheckMiddleware, sessionControll.updateProduct);

productsRouter.delete('/:id', authenticationMiddleware, adminCheckMiddleware, sessionControll.deleteProduct);