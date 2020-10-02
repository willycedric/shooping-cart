import express, { Request, Response } from 'express';
import { Product } from '../models/product';
const router = express.Router();

router.get('/api/shopping/products', async (req: Request, res: Response) => {
  const prodcuts = await Product.find({});
  res.send(prodcuts);
});

export { router as indexProductRouter };
