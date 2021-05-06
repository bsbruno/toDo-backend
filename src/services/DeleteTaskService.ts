/* import Task from '../model/Tasks';
import { getCustomRepository, getRepository } from 'typeorm';
import AppError from '../error/AppError';
import TaskRepository from '../repositories/TaskRepository';

interface IRequest {
    id: string;
}

export default class DeleteTaskService {
    public async execute({ id }: IRequest): Promise<void> {
        try {
            const deleteTaskRepository = getRepository(Task);

            const findTask = await deleteTaskRepository.findOne({
                where: {
                    id,
                },
            });

            if (!findTask) {
                throw new AppError('task dosent Exist', 404);
            }
            await deleteTaskRepository.remove(findTask);
        } catch (error) {
            console.log(error.message);
        }
    }
}
 */
