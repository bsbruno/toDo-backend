import { Router } from 'express';
import { getCustomRepository, getRepository } from 'typeorm';
import ensureAutheticade from '../middlewares/ensureAutheticade';
import Tasks from '../model/Tasks';
import CreateTaskService from '../services/CreateTaskService';
import DeleteTaskService from '../services/DeleteTaskService';

const taskRoutes = Router();

taskRoutes.get('/', ensureAutheticade, async (req, res) => {
    const userRepository = getRepository(Tasks);
    const allTasks = await userRepository.find();
    return res.json(allTasks);
});

taskRoutes.post('/', ensureAutheticade, async (req, res) => {
    const { user_id, title } = req.body;
    const createTaskService = new CreateTaskService();

    const task = await createTaskService.execute({
        user_id,
        title,
    });

    return res.json(task);
});

taskRoutes.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const deleteTaskService = new DeleteTaskService();

    await deleteTaskService.execute({ id });

    return res.json({});
});

export default taskRoutes;
