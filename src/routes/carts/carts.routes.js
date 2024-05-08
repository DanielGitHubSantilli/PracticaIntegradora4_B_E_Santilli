import {
    Router
} from 'express';
import {
    CartsController
} from '../../controllers/carts/carts.controller.js';

import {
    authUser as userMiddleware
} from '../../middlewares/auth.middleware.js';

const cartsRouter = Router();

cartsRouter.get('/', CartsController.getAll);
cartsRouter.get('/:code', CartsController.getOne);
cartsRouter.post('/', CartsController.saveOne);
cartsRouter.post('/:code/purchase', userMiddleware, CartsController.purchaseCart);
cartsRouter.put('/', userMiddleware, CartsController.addProduct);
cartsRouter.delete('/', CartsController.deleteCart);

export default cartsRouter;