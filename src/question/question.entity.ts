import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Score} from '../score/score.entity';

@Entity()
export class Question extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @Column()
    pluralText: string;

    @OneToMany(type => Score, score => score.question)
    scores: Score[];
}
