import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import auth from '../config/auth';
import AppError from '../error/AppError';

interface ITokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default function ensureAutheticade(
    request: Request,
    response: Response,
    next: NextFunction,
): void {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
        throw new AppError('jwt is missing', 401);
    }

    const token = authHeader.split(' ');

    try {
        const decode = verify(token[3], auth.jwt.secret);

        const { sub } = decode as ITokenPayload;
        request.user = {
            id: sub,
        };

        next();
    } catch (error) {
        throw new AppError('invalid JWT token', 401);
    }
}
