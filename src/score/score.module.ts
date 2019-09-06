import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {VoteController} from '../vote/vote.controller';
import {ScoreService} from './score.service';
import {CompanyService} from '../company/company.service';
import {QuestionService} from '../question/question.service';
import {Question} from '../question/question.entity';
import {Company} from '../company/company.entity';
import {Score} from './score.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Company, Score, Question])],
  controllers: [VoteController],
  providers: [CompanyService, ScoreService, QuestionService],
})
export class ScoreModule {}
