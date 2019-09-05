import {Body, Controller, Post} from '@nestjs/common';
import {VoteDto} from './vote.dto';
import {ScoreService} from '../score/score.service';

@Controller('vote')
export class VoteController {
  constructor(private readonly scoreService: ScoreService) {}

  @Post()
  vote(@Body() voteDto: VoteDto) {
    return this.scoreService.vote(voteDto);
  }
}
