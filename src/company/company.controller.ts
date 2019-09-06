import {Controller, Get, Param} from '@nestjs/common';
import {CompanyService} from './company.service';
import {Company} from './interfaces/company.interface';
import {Score} from '../score/score.entity';
import {ScoreService} from '../score/score.service';

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

  @Get(':id/scores')
  getScores(@Param('id') id: number): Promise<Score[]> {
    return this.companyService.getQuestionsForCompany(id);
  }
}
