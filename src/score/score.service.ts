import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Score} from './score.entity';
import {Repository} from 'typeorm';
import {VoteDto} from '../vote/vote.dto';
import * as Elo from '@pelevesque/elo';
import {Outcome, OutcomeResponse} from './interfaces/outcome.interface';
import {Company} from '../company/company.entity';
import {Question} from '../question/question.entity';

const DEFAULT_SCORE: number = 1000;
const EloCalculator = new Elo();

@Injectable()
export class ScoreService {
  constructor(
    @InjectRepository(Score)
    private readonly scoreRepository: Repository<Score>,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {
  }

  async vote(voteDto: VoteDto) {
    const winnerScore: Score = await this.getScore(voteDto, 'winner');
    const loserScore: Score = await this.getScore(voteDto, 'loser');

    const oldWinnerScore: number = winnerScore ? winnerScore.score : DEFAULT_SCORE;
    const oldLoserScore: number = loserScore ? loserScore.score : DEFAULT_SCORE;

    const outcome: OutcomeResponse = this.calculateOutcome(oldWinnerScore, oldLoserScore);

    await this.saveScore(voteDto, outcome.winnerScore, outcome.winnerDelta, 'winner');
    await this.saveScore(voteDto, outcome.loserScore, outcome.loserDelta, 'loser');

    return outcome;
  }

  getScoresForQuestion(id: number): Promise<Score[]> {
    /* tslint:disable */
    return this.scoreRepository.query(`
      SELECT 
        "score"."id" AS "id", 
        "score"."score", 
        "company"."name" AS "name" 
      FROM company 
      INNER JOIN score ON "score"."id" = (
        SELECT 
          "id" 
        FROM score 
        WHERE "score"."companyId" = "company"."id" 
        ORDER BY "score"."createdAt" 
        DESC LIMIT 1) 
      WHERE "score"."questionId" = $1 
      ORDER BY "score" DESC
    `, [id]);
    /* tslint:enable */
  }

  private getScore(voteDto: VoteDto, position: string) {
    return this.scoreRepository
      .createQueryBuilder()
      .where(`"questionId" = :questionId AND "companyId" = :${position}Id`, voteDto)
      .orderBy('"createdAt"', 'ASC')
      .getOne();
  }

  private async saveScore(voteDto: VoteDto, rating: number, delta: number, position: string) {
    const newScore: Score = new Score();
    newScore.company = await this.companyRepository.findOne(voteDto[`${position}Id`]);
    newScore.question = await this.questionRepository.findOne(voteDto.questionId);
    newScore.score = rating;
    newScore.delta = delta;
    newScore.winner = position === 'winner';
    return this.scoreRepository.save(newScore);
  }

  private calculateOutcome(a: number, b: number) {
    const outcome: Outcome = EloCalculator.getOutcome(a, b, 1, 40, 400);
    return {
      winnerScore: Math.round(outcome.a.rating),
      winnerDelta: Math.round(outcome.a.delta),
      loserScore: Math.round(outcome.b.rating),
      loserDelta: Math.round(outcome.b.delta),
    };
  }
}
