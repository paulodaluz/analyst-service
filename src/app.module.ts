import { Module } from '@nestjs/common';
import { AnalystController } from './controllers/analyst.controller';
import { AnalystService } from './services/analyst.service';

@Module({
  imports: [],
  controllers: [AnalystController],
  providers: [AnalystService],
})
export class AppModule {}
