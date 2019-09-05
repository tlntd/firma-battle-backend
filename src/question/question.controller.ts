import {Controller, Get, Param} from '@nestjs/common';
import {Question} from './interfaces/question.interface';
import {QuestionService} from './question.service';
import {Score} from '../score/score.entity';
import {ScoreService} from '../score/score.service';

@Controller('questions')
export class QuestionController {
  constructor(
    private readonly questionsService: QuestionService,
    private readonly scoreService: ScoreService,
    ) {
  }

  @Get()
  questions(): Promise<Question[]> {
    return this.questionsService.getAll();
  }

  @Get('random')
  randomQuestion(): Promise<Question> {
    return this.questionsService.getRandom();
  }

  @Get(':id/scores')
  getScores(@Param('id') id: number): Promise<Score[]> {
    return this.scoreService.getScoresForQuestion(id);
  }
}
