import {
    Router
} from "express";

import {
    authFromCookie as authMiddleware
} from "../../middlewares/auth.middleware.js";

import {
    ViewsController
} from "../../controllers/views/views.controller.js";

const viewsRouter = Router();

viewsRouter.get('/login', ViewsController.login);
viewsRouter.get('/register', ViewsController.register);
viewsRouter.get('/profile', authMiddleware, ViewsController.profile);
viewsRouter.get('/products', authMiddleware, ViewsController.products);
viewsRouter.get('/resetPasswordRequest', ViewsController.resetPasswordRequest);
viewsRouter.get('/resetPassword', ViewsController.resetPassword);

export default viewsRouter;