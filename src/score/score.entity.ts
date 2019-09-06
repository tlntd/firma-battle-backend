import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Company} from '../company/company.entity';
import {Question} from '../question/question.entity';

@Entity()
export class Score extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(company => Company, company => company.scores)
  company: Company;

  @ManyToOne(opponent => Company, opponent => opponent.scores)
  opponent: Company;

  @ManyToOne(question => Question, question => question.scores)
  question: Question;

  @Column()
  score: number;

  @Column()
  delta: number;

  @Column()
  winner: boolean;

  @Column('timestamp', { precision: 3, default: () => 'CURRENT_TIMESTAMP(3)'})
  createdAt: Date;
}
