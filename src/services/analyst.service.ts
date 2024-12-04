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

  async updateAnalyst(uuid: string, analyst) {
    Logger.log(
      `uuid = ${uuid}`,
      `${this.className} - ${this.updateAnalyst.name}`,
    );

    if (analyst.uuid) {
      Reflect.deleteProperty(analyst, 'uuid');
    }

    if (!Object.values(analyst).length) {
      ErrorUtils.throwSpecificError(400);
    }

    const analysExist: any = await this.analystModel.findById(uuid);

    if (!analysExist || !analysExist.id) {
      Logger.error(
        `uuid = ${uuid} - ERROR = User not found`,
        `${this.className} - ${this.updateAnalyst.name}`,
      );

      ErrorUtils.throwSpecificError(404);
    }

    await this.analystModel.findOneAndUpdate({ _id: uuid }, analyst);
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
