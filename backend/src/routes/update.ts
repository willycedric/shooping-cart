import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
  NotFoundError,
  validateRequest,
} from '@invasivemushrooms/ticketing-common';
import { Product } from '../models/product';

const router = express.Router();

router.put(
  '/api/shopping/products/:id',
  [
    body('image').not().isEmpty().withMessage('image url is required'),
    body('price').not().isEmpty().withMessage('| price is required'),
    body('title').not().isEmpty().withMessage('title is required'),
    body('description')
      .not()
      .isEmpty()
      .withMessage('| description is required'),
    body('availableSizes')
      .not()
      .isEmpty()
      .custom((input: string[]) => {
        const possibleSizes = ['X', 'L', 'XL', 'XXL', 'S', 'M'];
        if (input) {
          const entrySize = input.length;
          const validSizes = input.filter((entry) => {
            return possibleSizes.includes(entry);
          });
          return validSizes.length === entrySize;
        } else {
          return false;
        }
      })
      .withMessage(
        'AvailableSizes are missing or one of the sizes given is not allowed'
      ),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { description, image, price, availableSizes, title } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) {
      throw new NotFoundError();
    }
    product.set({
      description,
      image,
      price,
      availableSizes,
      title,
    });
    await product.save();
    res.send(product);
  }
);

export { router as updateProductRouter };
