import { EntityRepository, Repository } from 'typeorm';
import Users from '../model/Users';

@EntityRepository(Users)
class UsersRepository extends Repository<Users> {
    public async findByEmail(email: string): Promise<Users | undefined> {
        const findUsers = await this.findOne({
            where: {
                email,
            },
        });
        return findUsers;
    }
}

export default UsersRepository;
