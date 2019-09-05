import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Score} from '../score/score.entity';
import {VoteController} from './vote.controller';
import {ScoreService} from '../score/score.service';
import {Company} from '../company/company.entity';
import {Question} from '../question/question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Score, Company, Question])],
  controllers: [VoteController],
  providers: [ScoreService],
})
export class VoteModule {}
