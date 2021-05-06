import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import Users from './Users';

@Entity('tasks')
export default class Tasks {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    user_id: string;

    @Column()
    title: string;

    @Column()
    file: string;

    @ManyToOne(() => Users)
    @JoinColumn({ name: 'user_id' })
    task: Users;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
