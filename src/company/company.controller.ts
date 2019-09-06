import {Controller, Get, Param} from '@nestjs/common';
import {CompanyService} from './company.service';
import {Company} from './interfaces/company.interface';
import {Question} from '../question/interfaces/question.interface';
import {Score} from '../score/interfaces/score.interface';

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

  @Get(':id/scores')
  getScores(@Param('id') id: number): Promise<Score[]> {
    return this.companyService.getScoresForCompany(id);
  }
}
