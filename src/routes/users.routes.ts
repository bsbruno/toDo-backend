import { Router } from 'express';
import { getCustomRepository, getRepository } from 'typeorm';
import ensureAutheticade from '../middlewares/ensureAutheticade';
import Users from '../model/Users';
import CreateUserService from '../services/CreateUsersService';

const usersRoutes = Router();

usersRoutes.get('/', async (req, res) => {
    const userRepository = getRepository(Users);
    const allUsers = await userRepository.find();
    return res.json(allUsers);
});

usersRoutes.post('/', async (req, res) => {
    const { name, email, password } = req.body;
    const createUserService = new CreateUserService();

    const user = await createUserService.execute({
        name,
        email,
        password,
    });

    return res.json(user);
});

export default usersRoutes;
