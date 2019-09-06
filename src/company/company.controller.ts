import {Controller, Get, Param, Req} from '@nestjs/common';
import {CompanyService} from './company.service';
import {Company} from './interfaces/company.interface';
import {Question} from '../question/interfaces/question.interface';
import {Score} from '../score/interfaces/score.interface';
import {Request} from 'express';

@Controller('companies')
export class CompanyController {
  constructor(
    private readonly companyService: CompanyService,
  ) {
  }

  @Get()
  getAll(): Promise<Company[]> {
    return this.companyService.getAll();
  }

  @Get('random')
  getTwoRandom(): Promise<Company[]> {
    return this.companyService.getTwoRandom();
  }

  @Get(':id/questions')
  getQuestions(@Param('id') id: number): Promise<Question[]> {
    return this.companyService.getQuestionsForCompany(id);
  }

  @Get(':companyId/questions/:questionId/scores')
  getScores(@Req() req: Request): Promise<Score[]> {
    const {companyId, questionId} = req.params;
    const cId = parseInt(companyId, 10);
    const qId = parseInt(questionId, 10);
    if (cId && qId) {
      return this.companyService.getScoresForQuestionsForCompany(cId, qId);
    }
  }
}
