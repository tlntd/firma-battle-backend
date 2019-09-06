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

    await this.saveScore(voteDto, outcome, true);
    await this.saveScore(voteDto, outcome, false);

    return outcome;
  }

  async getScoresForQuestion(id: number): Promise<Score[]> {
    /* tslint:disable */
    const scores = await this.scoreRepository.query(`
      SELECT 
        "score"."id" AS "id", 
        "score"."score", 
        "company"."name" AS "name",
        "company"."id" AS "companyId"
      FROM company 
      INNER JOIN score ON "score"."id" = (
        SELECT 
          "id" 
        FROM score 
        WHERE "score"."companyId" = "company"."id" 
        ORDER BY "score"."createdAt" DESC 
        LIMIT 1) 
      WHERE "score"."questionId" = $1 
      ORDER BY "score" DESC
    `, [id]);
    const wins = await this.scoreRepository.query(`
      SELECT 
        "companyId",
        COUNT(CASE WHEN "score"."winner" THEN 1 END) AS "wins",
        COUNT(*) AS "scores"
      FROM score 
      WHERE "score"."questionId" = $1
      GROUP BY "companyId"
    `, [id]);
    return scores.map((score) => {
      const win = wins.find((win) => win.companyId === score.companyId);
      return {...score, ...win}
    });
    /* tslint:enable */
  }

  private getScore(voteDto: VoteDto, position: string) {
    return this.scoreRepository
      .createQueryBuilder()
      .where(`"questionId" = :questionId AND "companyId" = :${position}Id`, voteDto)
      .orderBy('"createdAt"', 'DESC')
      .getOne();
  }

  private async saveScore(voteDto: VoteDto, outcome: OutcomeResponse, winner: boolean) {
    const newScore: Score = new Score();
    newScore.question = await this.questionRepository.findOne(voteDto.questionId);
    newScore.winner = winner;
    if (winner) {
      newScore.company = await this.companyRepository.findOne(voteDto.winnerId);
      newScore.opponent = await this.companyRepository.findOne(voteDto.loserId);
      newScore.score = outcome.winnerScore;
      newScore.delta = outcome.winnerDelta;
    } else {
      newScore.company = await this.companyRepository.findOne(voteDto.loserId);
      newScore.opponent = await this.companyRepository.findOne(voteDto.winnerId);
      newScore.score = outcome.loserScore;
      newScore.delta = outcome.loserDelta;
    }
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
