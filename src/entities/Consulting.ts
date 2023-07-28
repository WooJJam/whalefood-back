import { Entity, Column, JoinColumn, ManyToOne } from 'typeorm';
import { defaultColumn } from './common/default-columns';
import { User } from './User';
""
@Entity()
export class Consulting extends defaultColumn{

    @Column({length:500})
    title: string;

    @Column({length: 2000})
    content: string;

    @ManyToOne(() => User, user => user.counselingRecords)
    @JoinColumn({ name: "userId" })
    user: User;
}