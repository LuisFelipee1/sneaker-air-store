import { Router } from 'express';
import { SessionController } from '../controller/session.controller.js';

export const sessionRoute = Router();
export const sessionControll = new SessionController();

sessionRoute.post('/', sessionControll.login);
