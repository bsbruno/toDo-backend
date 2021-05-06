import Task from '../model/Tasks';
import { getRepository } from 'typeorm';
import AppError from '../error/AppError';

interface IRequest {
    title: string;
    user_id: string;
}

export default class CreateTaskService {
    public async execute({ title, user_id }: IRequest): Promise<Task> {
        const taskRepository = getRepository(Task);

        const task = taskRepository.create({
            title,
            user_id,
        });

        await taskRepository.save(task);
        return task;
    }
}
