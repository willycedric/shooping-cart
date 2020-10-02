import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '@invasivemushrooms/ticketing-common';
import { Product } from '../models/product';
const router = express.Router();

router.post(
  '/api/shopping/products',
  [
    body('image').not().isEmpty().withMessage('image url is required'),
    body('price').not().isEmpty().withMessage('product price is required'),
    body('title').not().isEmpty().withMessage('title is required'),
    body('description')
      .not()
      .isEmpty()
      .withMessage('product description is required'),
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
    const product = Product.build({
      image,
      price,
      description,
      availableSizes,
      title,
    });
    await product.save();
    res.status(201).send(product);
  }
);
export { router as createProductRouter };
