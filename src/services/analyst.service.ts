import { Injectable, Inject } from '@nestjs/common';
import { AnalystInterface } from '../interfaces/analyst.interface';
import { CreateAnalystDto } from '../validators/createAnalyst.dto';
import { Model } from 'mongoose';

@Injectable()
export class AnalystService {
  constructor(
    @Inject('ANALYST_MODEL')
    private analystModel: Model<AnalystInterface>,
  ) {}

  getAnalyst(id): AnalystInterface {
    return {
      id,
      fullname: 'Paulo da Luz',
      birthDay: '25/11/2000',
      documentNumber: '146.434.650-00',
      gender: 'male',
      adress: {
        street: 'Morom',
        number: 2584,
        city: 'Porto Alegre',
        state: 'RS',
        postalCode: '29931-140',
      },
      contact: {
        phone: '54991083039',
        email: 'rm353710@fiap.com.br',
        contactPreference: 'email',
      },
    };
  }

  async createAnalyst(analyst: CreateAnalystDto) {
    const createdAnalyst = new this.analystModel(analyst);
    console.log('analyst criado!', { analyst });
    const bola = await createdAnalyst.save();
    return bola;
  }

  updateAnalyst(id, analyst) {
    console.log('analyst atualizado!', { id, analyst });
  }

  deleteAnalyst(id) {
    console.log('analyst deletado!', { id });
  }
}
