import e from 'express';
import { usersRoute } from './Routes/user.route.js';
import bodyParser from 'body-parser';
import { sessionRoute } from './Routes/session.router.js';
import cors from 'cors'
import { productsRouter } from './Routes/product.route.js';
import { cartRouter } from './Routes/cart.route.js';

export class Server {
    constructor(port) {
        this.app = e();

        this.setMiddlewares();

        this.setRoutes();

        this.listen(port);
    }

    setMiddlewares() {
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
        this.app.use(cors({ origin: '*' }));
    }

    setRoutes() {
        this.app.use(e.static('public'));
        this.app.use('/api/users', usersRoute);
        this.app.use('/api/session', sessionRoute);
        this.app.use('/api/products', productsRouter);
        this.app.use('/api/cart', cartRouter);
    }

    listen(port) {
        this.app.listen(port, () => {
            console.log(`ouvindo na porta ${port}`);
        });
    }
}