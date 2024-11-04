import { Injectable } from '@nestjs/common';
import { UUID } from 'crypto';
import {
  AnalystInterface,
  CreateAnalystInterface,
} from 'src/interfaces/analyst.interface';

@Injectable()
export class AnalystService {
  getAnalyst(id: UUID): AnalystInterface {
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

  createAnalyst(analyst: CreateAnalystInterface) {
    console.log('analyst criado!', { analyst });
  }

  updateAnalyst(id: UUID, analyst: AnalystInterface) {
    console.log('analyst atualizado!', { id, analyst });
  }

  deleteAnalyst(id: UUID) {
    console.log('analyst deletado!', { id });
  }
}
