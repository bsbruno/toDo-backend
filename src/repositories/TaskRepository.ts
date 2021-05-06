import { EntityRepository, Repository } from 'typeorm';
import Tasks from '../model/Tasks';

@EntityRepository(Tasks)
class TaskRepository extends Repository<Tasks> {
    public async findById(id: string): Promise<Tasks | undefined> {
        const findTask = await this.findOne({
            where: {
                id,
            },
        });
        return findTask || undefined;
    }
}

export default TaskRepository;
