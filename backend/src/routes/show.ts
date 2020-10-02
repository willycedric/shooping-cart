import { NotFoundError } from '@invasivemushrooms/ticketing-common';
import express, { Request, Response } from 'express';
import { Product } from '../models/product';

const router = express.Router();

router.get(
  '/api/shopping/products/:id',
  async (req: Request, res: Response) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
      // res.status(404).send('not found');
      throw new NotFoundError();
    }
    res.status(404).send(product);
  }
);

export { router as showProductRouter };
