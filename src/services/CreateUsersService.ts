import Users from '../model/Users';
import { hash } from 'bcrypt';
import { CannotExecuteNotConnectedError, getRepository } from 'typeorm';
import AppError from '../error/AppError';

interface IRequest {
    name: string;
    email: string;
    password: string;
}

export default class CreateUserService {
    public async execute({ name, email, password }: IRequest): Promise<Users> {
        const userRepository = getRepository(Users);
        const checkUserExist = await userRepository.findOne({
            where: {
                email,
            },
        });
        if (checkUserExist) {
            throw new AppError('email arealdy exist ');
        }
        const hashedPassword = await hash(password, 10);
        const user = userRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        await userRepository.save(user);
        return user;
    }
}
