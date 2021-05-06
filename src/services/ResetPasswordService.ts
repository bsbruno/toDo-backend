import { getCustomRepository, getRepository } from 'typeorm';
import AppError from '../error/AppError';
import { isAfter, addHours } from 'date-fns';
import Users from '../model/Users';
import UserTokenRepository from '../repositories/UserTokensRepository';
import { hash } from 'bcrypt';

interface IRequest {
    token: string;
    password: string;
}

export default class ResetPasswordService {
    public async execute({ token, password }: IRequest): Promise<void> {
        const userRepository = getRepository(Users);
        const userRepositoryToke = getCustomRepository(UserTokenRepository);
        const userToken = await userRepositoryToke.findByToken(token);

        if (!userToken) {
            throw new AppError('User does not Exist');
        }
        const user = await userRepository.findOne(userToken.user_id);

        if (!user) {
            throw new AppError('user does not existed  ');
        }

        const tokenCreateAt = userToken.created_at;
        const dateCompare = addHours(tokenCreateAt, 1);

        if (isAfter(Date.now(), dateCompare)) {
            throw new AppError('token expired');
        }

        user.password = await hash(password, 10);
        await userRepository.save(user);
    }
}
