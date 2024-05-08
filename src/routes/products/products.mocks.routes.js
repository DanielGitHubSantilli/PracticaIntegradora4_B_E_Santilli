import {
      generateProducts
} from "../../utils/mocks/products/products.mocks.utils.js";
import {
      Router
} from "express";

const productsMocksRouter = Router();

productsMocksRouter.get('/products', (req, res) => {

      const total = +req.query.total || 500;

      const products = Array.from({
            length: total
      }, generateProducts);

      res.json({
            success: true,
            payload: products,
            total
      });

});

export default productsMocksRouter;