import {Controller, Get} from '@nestjs/common';
import {CompanyService} from './company.service';
import {Company} from './interfaces/company.interface';

@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) { }

  @Get()
  getAll(): Promise<Company[]> {
    return this.companyService.getAll();
  }

  @Get('random')
  getTwoRandom(): Promise<Company[]> {
    return this.companyService.getTwoRandom();
  }
}
