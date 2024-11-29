import { Injectable, Inject, Logger } from '@nestjs/common';
import { AnalystInterface } from '../interfaces/analyst.interface';
import { CreateAnalystDto } from '../validators/createAnalyst.dto';
import { Model } from 'mongoose';
import { ErrorUtils } from 'src/utils/errors.utils';

@Injectable()
export class AnalystService {
  private className = 'AnalystService';

  constructor(
    @Inject('ANALYST_MODEL')
    private analystModel: Model<AnalystInterface>,
  ) {}

  async getAnalyst(id: string): Promise<AnalystInterface> {
    const analyst = await this.analystModel.findById(id);

    if (analyst?.id) return analyst;

    return ErrorUtils.throwSpecificError(404);
  }

  async createAnalyst(analyst: CreateAnalystDto) {
    const createdAnalyst = new this.analystModel(analyst);

    return await createdAnalyst.save();
  }

  updateAnalyst(id, analyst) {
    console.log('analyst atualizado!', { id, analyst });
  }

  async deleteAnalyst(id: string) {
    try {
      const analyst = await this.analystModel.findById(id);

      if (analyst?.id) return await this.analystModel.deleteOne({ _id: id });
    } catch (error) {
      Logger.error(
        `analyst.id = ${id} - error = ${error}`,
        '',
        `${this.className} - ${this.deleteAnalyst.name}`,
      );
    }

    return ErrorUtils.throwSpecificError(400);
  }
}
