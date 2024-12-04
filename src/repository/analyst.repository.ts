import { Injectable, Inject, Logger } from '@nestjs/common';
import { AnalystInterface } from '../interfaces/analyst.interface';
import { CreateAnalystDto } from '../validators/createAnalyst.dto';
import { Model } from 'mongoose';

@Injectable()
export class AnalystRepository {
  private className = 'AnalystRepository';

  constructor(
    @Inject('ANALYST_MODEL')
    private analystModel: Model<AnalystInterface>,
  ) {}

  async getAnalyst(uuid: string): Promise<any> {
    Logger.log(`uuid = ${uuid}`, `${this.className} - ${this.getAnalyst.name}`);

    return await this.analystModel.findOne({ _id: uuid });
  }

  async createAnalyst(analyst: CreateAnalystDto) {
    Logger.log(
      `analyst = ${JSON.stringify(analyst)}`,
      `${this.className} - ${this.createAnalyst.name}`,
    );
    const createdAnalyst = new this.analystModel(analyst);

    await createdAnalyst.save();

    return { uuid: createdAnalyst._id };
  }

  async updateAnalyst(uuid: string, analyst) {
    Logger.log(
      `uuid = ${uuid}, analyst = ${analyst}`,
      `${this.className} - ${this.updateAnalyst.name}`,
    );

    await this.analystModel.findOneAndUpdate({ _id: uuid }, analyst);
  }

  async deleteAnalyst(id: string) {
    Logger.log(`id = ${id}`, `${this.className} - ${this.deleteAnalyst.name}`);

    return await this.analystModel.deleteOne({ _id: id });
  }
}
