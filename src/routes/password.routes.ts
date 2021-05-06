import { Router } from 'express';
import { getCustomRepository, getRepository } from 'typeorm';
import ensureAutheticade from '../middlewares/ensureAutheticade';
import Users from '../model/Users';
import CreateUserService from '../services/CreateUsersService';
import SendForgotPasswordEmail from '../services/SendForgotPasswordEmail';
import ResetPasswordService from '../services/ResetPasswordService';

const passwordRoutes = Router();

passwordRoutes.post('/forgot', async (req, res) => {
    const { email } = req.body;

    const sendForgotPasswordEmail = new SendForgotPasswordEmail();
    const teste = await sendForgotPasswordEmail.execute({ email });

    return res.json(teste);
});

passwordRoutes.post('/reset', async (req, res) => {
    const { token, password } = req.body;

    const resetPassword = new ResetPasswordService();

    const UserPassword = resetPassword.execute({
        token,
        password,
    });

    return res.json(UserPassword);
});

export default passwordRoutes;
