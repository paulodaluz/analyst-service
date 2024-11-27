import { Module } from '@nestjs/common';
import { AnalystController } from './controllers/analyst.controller';
import { AnalystService } from './services/analyst.service';
import { databaseProviders } from './database/database.providers';
import { analystProviders } from './database/analyst.provider';

@Module({
  imports: [],
  controllers: [AnalystController],
  providers: [AnalystService, ...databaseProviders, ...analystProviders],
  exports: [...databaseProviders],
})
export class AppModule {}
