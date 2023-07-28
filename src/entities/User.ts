import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from 'typeorm';
import { defaultColumn } from './common/default-columns';
import { AgeType, GenderType, SexPrefType } from '../type';
import { Consulting } from './Consulting';

@Entity()
export class User extends defaultColumn{

    @Column()
    nickname: string;

    @Column()
    password: string;

    @Column()
    gender: GenderType | null;

    @Column()
    age: AgeType| null;

    @Column()
    sexpref: SexPrefType|null;

    @Column()
    seesionId: string;

    @OneToMany(() => Consulting, consulting => consulting.user)
    counselingRecords: Consulting[];
}