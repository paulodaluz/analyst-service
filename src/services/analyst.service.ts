import { Injectable, Logger } from '@nestjs/common';
import { AnalystInterface } from '../interfaces/analyst.interface';
import { CreateAnalystDto } from '../validators/createAnalyst.dto';

import { ErrorUtils } from '../utils/errors.utils';
import { AnalystRepository } from '../repository/analyst.repository';

@Injectable()
export class AnalystService {
  private className = 'AnalystService';

  constructor(private readonly analystRepository: AnalystRepository) {}

  async getAnalyst(id: string): Promise<AnalystInterface> {
    const analyst = await this.analystRepository.getAnalyst(id);

    if (analyst?._id) {
      return analyst;
    }
    return ErrorUtils.throwSpecificError(404);
  }

  async createAnalyst(analyst: CreateAnalystDto) {
    return await this.analystRepository.createAnalyst(analyst);
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

    const analystExist = await this.analystRepository.getAnalyst(uuid);

    if (!analystExist || !analystExist._id) {
      Logger.error(
        `uuid = ${uuid} - ERROR = User not found`,
        `${this.className} - ${this.updateAnalyst.name}`,
      );

      ErrorUtils.throwSpecificError(404);
    }

    return await this.analystRepository.updateAnalyst(uuid, analyst);
  }

  async deleteAnalyst(uuid: string) {
    try {
      const analyst = await this.analystRepository.getAnalyst(uuid);

      if (analyst?._id) return await this.analystRepository.deleteAnalyst(uuid);
    } catch (error) {
      Logger.error(
        `analyst.id = ${uuid} - error = ${error}`,
        '',
        `${this.className} - ${this.deleteAnalyst.name}`,
      );

      return ErrorUtils.throwSpecificError(400);
    }

    return ErrorUtils.throwSpecificError(404);
  }
}
