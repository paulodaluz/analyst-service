import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AnalystService } from '../services/analyst.service';
import {
  AnalystInterface,
  CreateAnalystInterface,
} from '../interfaces/analyst.interface';
import { UUID } from 'crypto';

@Controller('analyst-service')
export class AnalystController {
  constructor(private readonly analystService: AnalystService) {}

  @Get(':id')
  getAnalyst(@Param() id: UUID): AnalystInterface {
    return this.analystService.getAnalyst(id);
  }

  @Post()
  @HttpCode(201)
  createAnalyst(@Body() body: CreateAnalystInterface): void {
    this.analystService.createAnalyst(body);
  }

  @Put(':id')
  updateAnalyst(@Param() id: UUID, @Body() body: AnalystInterface): void {
    this.analystService.updateAnalyst(id, body);
  }

  @Delete(':id')
  deleteAnalyst(@Param() id: UUID): void {
    return this.analystService.deleteAnalyst(id);
  }
}
