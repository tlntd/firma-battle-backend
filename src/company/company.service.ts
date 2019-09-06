import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Company} from './company.entity';
import {Question} from '../question/interfaces/question.interface';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {
  }

  getAll(): Promise<Company[]> {
    return this.companyRepository.createQueryBuilder().select(['id', 'name']).execute();
  }

  getTwoRandom(): Promise<Company[]> {
    return this.companyRepository.createQueryBuilder().select(['id', 'name', 'logo']).orderBy('RANDOM()').limit(2).execute();
  }

  getQuestionsForCompany(id: number): Promise<Question[]> {
    /* tslint:disable */
    return this.companyRepository.query(`
      SELECT 
        "score"."score" AS "score",
        "question"."pluralText" AS "pluralText",
        "question"."id" AS "id"
      FROM question 
      INNER JOIN score ON "score"."id" = (
        SELECT 
          "id" 
        FROM score 
        WHERE "score"."questionId" = "question"."id" 
        GROUP BY "id", "score"."questionId" 
        LIMIT 1) 
      WHERE "score"."companyId" = $1;
    `, [id]);
    /* tslint:enable */
  }
}
