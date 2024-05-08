import {
    generateUsers
} from "../../utils/mocks/users/users.mocks.utils.js";
import {
    Router
} from "express";

const usersMocksRouter = Router();

usersMocksRouter.get('/users', (req, res) => {

    const total = +req.query.total || 500;

    const users = Array.from({
        length: total
    }, generateUsers);

    res.json({
        success: true,
        payload: users,
        total
    });

});

export default usersMocksRouter;