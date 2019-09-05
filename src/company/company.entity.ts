import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Score} from '../score/score.entity';

@Entity()
export class Company extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  industry: string;

  @Column()
  employees: string;

  @Column()
  location: string;

  @Column()
  logo: string;

  @OneToMany(type => Score, score => score.company)
  scores: Score[];
}
