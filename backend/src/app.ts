import express from 'express';
import { json } from 'body-parser';
import 'express-async-errors';
import { createProductRouter } from './routes/new';
import { indexProductRouter } from './routes/index';
import { updateProductRouter } from './routes/update';
import { showProductRouter } from './routes/show';
import {
  errorHandler,
  NotFoundError,
} from '@invasivemushrooms/ticketing-common';
const app = express();

app.use(json());
app.use(createProductRouter);
app.use(indexProductRouter);
app.use(updateProductRouter);
app.use(showProductRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
