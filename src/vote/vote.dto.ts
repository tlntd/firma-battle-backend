import {IsNumber} from 'class-validator';

export class VoteDto {
  @IsNumber()
  questionId: number;

  @IsNumber()
  winnerId: number;

  @IsNumber()
  loserId: number;
}
