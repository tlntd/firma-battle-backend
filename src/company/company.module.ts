import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Company} from './company.entity';
import {CompanyController} from './company.controller';
import {ScoreService} from '../score/score.service';
import {Score} from '../score/score.entity';
import {Question} from '../question/question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Company, Score, Question])],
  controllers: [CompanyController],
  providers: [CompanyService, ScoreService],
})
export class CompanyModule {}
