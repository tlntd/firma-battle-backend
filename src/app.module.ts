import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionModule } from './question/question.module';
import {ConfigModule, ConfigService} from 'nestjs-config';
import { CompanyModule } from './company/company.module';
import { ScoreModule } from './score/score.module';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.load(path.resolve(__dirname, 'config', '**', '!(*.d).{ts,js}')),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService],
    }),
    QuestionModule,
    CompanyModule,
    ScoreModule,
  ],
})
export class AppModule {}
