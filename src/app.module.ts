import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {RateLimiterInterceptor, RateLimiterModule} from 'nestjs-rate-limiter';
import { QuestionModule } from './question/question.module';
import {ConfigModule, ConfigService} from 'nestjs-config';
import { CompanyModule } from './company/company.module';
import { ScoreModule } from './score/score.module';
import * as path from 'path';
import {APP_INTERCEPTOR} from '@nestjs/core';

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
    RateLimiterModule.register({
      points: 5,
      duration: 1,
      type: 'Memory',
    }),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: RateLimiterInterceptor,
    },
  ],
})
export class AppModule {}
