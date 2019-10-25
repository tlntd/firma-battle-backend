import {Body, Controller, HttpException, HttpStatus, Post} from '@nestjs/common';
import {VoteDto} from './vote.dto';
import {ScoreService} from '../score/score.service';
import {QuestionService} from '../question/question.service';
import {CompanyService} from '../company/company.service';

@Controller('vote')
export class VoteController {
  constructor(private readonly companyService: CompanyService,
              private readonly scoreService: ScoreService,
              private readonly questionService: QuestionService) {}

  @Post()
  async vote(@Body() voteDto: VoteDto) {
    const { winnerId, loserId, questionId } = voteDto;

    const winnerAndLoserSame = winnerId === loserId;
    const questionExists = await this.questionService.exists(questionId);
    const winnerExists = await this.companyService.exists(winnerId);
    const loserExists = await this.companyService.exists(loserId);

    if (winnerAndLoserSame || !questionExists || !winnerExists || !loserExists) {
      throw new HttpException('Bad request.', HttpStatus.BAD_REQUEST);
    }

    return this.scoreService.vote(voteDto);
  }
}
