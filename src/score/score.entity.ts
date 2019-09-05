import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Company} from '../company/company.entity';
import {Question} from '../question/question.entity';

@Entity()
export class Score extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(company => Company, company => company.scores)
  company: Company;

  @ManyToOne(question => Question, question => question.scores)
  question: Question;

  @Column()
  score: number;
}
