import {Module} from '@nestjs/common';
import {QuestionController} from './question.controller';
import {QuestionService} from './question.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Question} from './question.entity';
import {ScoreService} from '../score/score.service';
import {Score} from '../score/score.entity';
import {Company} from '../company/company.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Score, Company, Question])],
    controllers: [QuestionController],
    providers: [QuestionService, ScoreService],
})
export class QuestionModule { }
