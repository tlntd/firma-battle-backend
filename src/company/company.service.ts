import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Company} from './company.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {
  }

  getTwoRandom(): Promise<Company[]> {
    return this.companyRepository.createQueryBuilder().select(['id', 'name', 'logo']).orderBy('RANDOM()').limit(2).execute();
  }
}
