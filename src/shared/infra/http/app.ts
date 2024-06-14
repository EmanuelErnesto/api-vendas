import uploadConfig from '@config/upload';
import AppError from '@shared/Errors/AppError';
import '@shared/container';
import '@shared/infra/typeorm';
import { errors } from 'celebrate';
import cors from 'cors';

import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';
import swaggerDoc from '../../../../swagger-output.json';
import rateLimiter from './middlewares/rateLimiter';
import routes from './routes/index';

const app = express();

app.use(cors());
app.use(express.json());
app.use(rateLimiter);
app.use('/files', express.static(uploadConfig.directory));

app.use(routes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use(errors());

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }
    console.log(error);
    return response.status(500).json({
      status: 'error',
      message: 'Internal server error.',
    });
  },
);

export { app };
