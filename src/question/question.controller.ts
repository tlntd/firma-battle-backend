import {Controller, Get} from '@nestjs/common';
import {Question} from './interfaces/question.interface';
import {QuestionService} from './question.service';

@Controller('questions')
export class QuestionController {
  constructor(private readonly questionsService: QuestionService) {
  }

  @Get()
  questions(): Promise<Question[]> {
    return this.questionsService.getAll();
  }

  @Get('random')
  randomQuestion(): Promise<Question> {
    return this.questionsService.getRandom();
  }
}
