import { Injectable } from '@nestjs/common';
import { AnalystInterface } from '../interfaces/analyst.interface';
import { CreateAnalystDto } from '../validators/createAnalyst.dto';

@Injectable()
export class AnalystService {
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
      contactPreference: {
        phone: '54991083039',
        email: 'rm353710@fiap.com.br',
        contactPreference: 'email',
      },
    };
  }

  createAnalyst(analyst: CreateAnalystDto) {
    console.log('analyst criado!', { analyst });
  }

  updateAnalyst(id, analyst) {
    console.log('analyst atualizado!', { id, analyst });
  }

  deleteAnalyst(id) {
    console.log('analyst deletado!', { id });
  }
}
