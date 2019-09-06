import {Module} from '@nestjs/common';
import {QuestionController} from './question.controller';
import {QuestionService} from './question.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Question} from '../../dist/question/question.entity';
import {ScoreService} from '../score/score.service';
import {Score} from '../../dist/score/score.entity';
import {Company} from '../../dist/company/company.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Company, Score, Question])],
    controllers: [QuestionController],
    providers: [QuestionService, ScoreService],
})
export class QuestionModule { }
