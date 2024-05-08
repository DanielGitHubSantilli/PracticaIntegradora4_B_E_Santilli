import {
      generateCarts
} from "../../utils/mocks/carts/carts.mocks.utils.js";
import {
      Router
} from "express";

const cartsMocksRouter = Router();

cartsMocksRouter.get('/carts', (req, res) => {

      const total = +req.query.total || 500;

      const carts = Array.from({
            length: total
      }, generateCarts);

      res.json({
            success: true,
            payload: carts,
            total
      });

});

export default cartsMocksRouter;