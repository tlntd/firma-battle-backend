import {Score} from '../../score/score.entity';

export interface Question {
  readonly id: number;
  readonly text: string;
  readonly pluralText: string;
  readonly scores?: Score[];
}
