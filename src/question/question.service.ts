import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Question} from './question.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {
  }

  getAll(): Promise<Question[]> {
    return this.questionRepository.createQueryBuilder().getMany();
  }

  getRandom(): Promise<Question> {
    return this.questionRepository.createQueryBuilder().orderBy('RANDOM()').limit(1).getOne();
  }

  async exists(questionId: number): Promise<boolean> {
    const result = await this.questionRepository.query(`
        SELECT EXISTS(
            SELECT "question"."id" FROM "question" WHERE "question"."id" = $1 LIMIT 1
        );`,
      [questionId]);
    return result[0].exists;
  }
}
