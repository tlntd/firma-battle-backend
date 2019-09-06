import {Company} from '../../company/company.entity';
import {Question} from '../../question/question.entity';

export interface Score {
  readonly id: number;
  company: Company;
  opponent: Company;
  question: Question;
  score: number;
  delta: number;
  winner: boolean;
  createdAt: Date;
}
