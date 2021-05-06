import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import './database';
import 'express-async-errors';
import routes from './routes';
import AppError from './error/AppError';

const app = express();

app.use(express.json());
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
    }
    return response.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
    });
});

app.listen(4750, () => {
    console.log('🔥🔥🔥🔥 , 4750');
});
