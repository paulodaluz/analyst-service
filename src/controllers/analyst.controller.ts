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
  getAnalyst(
    @Param(new ValidationPipe()) inputAnalystIdDto: InputAnalystIdDto,
  ): AnalystInterface {
    return this.analystService.getAnalyst(inputAnalystIdDto);
  }

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Create one Analyst' })
  @ApiResponse({
    status: 201,
    description: 'Create one analyst.',
  })
  createAnalyst(
    @Body(new ValidationPipe()) createAnalystDto: CreateAnalystDto,
  ) {
    this.analystService.createAnalyst(createAnalystDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an analyst' })
  @ApiResponse({ status: 200, description: 'Analyst updated successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  updateAnalyst(
    @Param(new ValidationPipe()) inputAnalystIdDto: InputAnalystIdDto,
    @Body(new ValidationPipe())
    updateAnalystAnalystDto: UpdateAnalystAnalystDto,
  ): void {
    this.analystService.updateAnalyst(
      inputAnalystIdDto,
      updateAnalystAnalystDto,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Analyst' })
  @ApiResponse({ status: 200, description: 'Analyst deleted successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  deleteAnalyst(
    @Param(new ValidationPipe()) inputAnalystIdDto: InputAnalystIdDto,
  ): void {
    return this.analystService.deleteAnalyst(inputAnalystIdDto);
  }
}
