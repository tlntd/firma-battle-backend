import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {VoteController} from '../vote/vote.controller';
import {ScoreService} from './score.service';
import {Question} from '../../dist/question/question.entity';
import {Company} from '../../dist/company/company.entity';
import {Score} from '../../dist/score/score.entity';
import {CompanyService} from '../company/company.service';
import {QuestionService} from '../question/question.service';

@Module({
  imports: [TypeOrmModule.forFeature([Score, Company, Question])],
  controllers: [VoteController],
  providers: [CompanyService, ScoreService, QuestionService],
})
export class ScoreModule {}
