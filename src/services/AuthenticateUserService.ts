import { compare } from 'bcrypt';
import { getRepository } from 'typeorm';
import AppError from '../error/AppError';
import Users from '../model/Users';
import { sign } from 'jsonwebtoken';
import auth from '../config/auth';

interface IRequest {
    email: string;
    password: string;
}

export default class AuthenticateUserService {
    public async execute({
        email,
        password,
    }: IRequest): Promise<{ user: Users; token: string }> {
        const userRepository = getRepository(Users);

        const user = await userRepository.findOne({
            where: {
                email,
            },
        });
        if (!user) {
            throw new AppError('Email/Password is wrog', 401);
        }
        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched) {
            throw new AppError('Email/Password is wrog', 401);
        }

        const token = sign({}, auth.jwt.secret, {
            subject: user.id,
            expiresIn: auth.jwt.expiresIn,
        });

        return {
            token,
            user,
        };
    }
}
