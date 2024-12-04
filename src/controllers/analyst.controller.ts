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
import { AnalystInterface } from '../interfaces/analyst.interface';
import { ValidationPipe } from '../validators/validation.pipe';
import { CreateAnalystDto } from '../validators/createAnalyst.dto';
import { InputAnalystIdDto } from '../validators/inputAnalystId.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AnalystEntity } from '../entity/analyst.entity';
import { UpdateAnalystAnalystDto } from '../validators/updateAnalyst.dto';
import { CreateAnalystReponse } from '../entity/createAnalystResponse.entity';

@Controller('users')
export class AnalystController {
  constructor(private readonly analystService: AnalystService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get one Analyst by ID' })
  @ApiResponse({
    status: 200,
    description: 'details of one analyst.',
    type: AnalystEntity,
  })
  @ApiResponse({ status: 404, description: 'Analyst not found.' })
  async getAnalyst(
    @Param(new ValidationPipe()) inputAnalystIdDto: InputAnalystIdDto,
  ): Promise<AnalystInterface> {
    return await this.analystService.getAnalyst(inputAnalystIdDto.id);
  }

  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: 'Create one Analyst' })
  @ApiResponse({
    status: 200,
    description: 'Create one analyst.',
    type: CreateAnalystReponse,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async createAnalyst(
    @Body(new ValidationPipe()) createAnalystDto: CreateAnalystDto,
  ) {
    return await this.analystService.createAnalyst(createAnalystDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an analyst' })
  @ApiResponse({ status: 200, description: 'Analyst updated successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async updateAnalyst(
    @Param(new ValidationPipe()) inputAnalystIdDto: InputAnalystIdDto,
    @Body(new ValidationPipe())
    updateAnalystAnalystDto: UpdateAnalystAnalystDto,
  ): Promise<void> {
    await this.analystService.updateAnalyst(
      inputAnalystIdDto.id,
      updateAnalystAnalystDto,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Analyst' })
  @ApiResponse({ status: 200, description: 'Analyst deleted successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async deleteAnalyst(
    @Param(new ValidationPipe()) inputAnalystIdDto: InputAnalystIdDto,
  ): Promise<void> {
    await this.analystService.deleteAnalyst(inputAnalystIdDto.id);
  }
}
