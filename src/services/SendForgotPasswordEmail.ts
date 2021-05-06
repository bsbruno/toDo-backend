import { getCustomRepository, getRepository } from 'typeorm';
import EmailSend from '../mail/EmailSend';
import AppError from '../error/AppError';

import Users from '../model/Users';
import UserTokenRepository from '../repositories/UserTokensRepository';
import UsersRepository from '../repositories/UsersRepository';

interface IRequest {
    email: string;
}

export default class SendForgotPasswordEmail {
    public async execute({ email }: IRequest): Promise<void> {
        const userRepository = getCustomRepository(UsersRepository);
        const userRepositoryToke = getCustomRepository(UserTokenRepository);

        try {
            const user = await userRepository.findByEmail(email);
            if (!user) {
                throw new AppError('User does not Exist');
            }

            const toke = await userRepositoryToke.generate(user.id);

            await EmailSend.sendEmail({
                to: email,
                body: `Solicitação de Recuperação de senha ${toke?.token}`,
            });
        } catch (error) {
            console.error(error);
        }
    }
}
