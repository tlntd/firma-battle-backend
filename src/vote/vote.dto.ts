import {IsInt} from 'class-validator';

export class VoteDto {
  @IsInt()
  questionId: number;

  @IsInt()
  winnerId: number;

  @IsInt()
  loserId: number;
}
