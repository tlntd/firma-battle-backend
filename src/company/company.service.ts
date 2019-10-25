import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Company} from './company.entity';
import {Question} from '../question/interfaces/question.interface';
import {Score} from '../score/score.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    @InjectRepository(Score)
    private readonly scoreRepository: Repository<Score>,
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

  async getScoresForCompany(id: number): Promise<Score[]> {
    /* tslint:disable */
    return this.scoreRepository.query(`
      SELECT 
        "opponent"."name" AS "opponentName",
        "opponent"."id" AS "opponentId", 
        "question"."text" AS "questionText",
        "question"."id" AS "questionId", 
        "delta" 
      FROM "score" "score" 
      INNER JOIN "company" "opponent" ON "opponent"."id"="score"."opponentId"  
      INNER JOIN "question" "question" ON "question"."id"="score"."questionId" 
      WHERE "companyId" = $1 
      ORDER BY "createdAt" DESC;
    `, [id]);
    /* tslint:enable */
  }

  async exists(companyId: number): Promise<boolean> {
    const result = await this.companyRepository.query(`
        SELECT EXISTS(
            SELECT "company"."id" FROM "company" WHERE "company"."id" = $1 LIMIT 1
        );`,
      [companyId]);
    return result[0].exists;
  }
}
