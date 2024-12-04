import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../../../src/app.module';
import MockData from '../../mock/analyst.mock';
import { AnalystService } from '../../../src/services/analyst.service';

describe('UserController test', () => {
  let app: INestApplication;
  let analystService: AnalystService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    analystService = await moduleRef.resolve(AnalystService);

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('/GET getAnalyst of a analyst with 200 ok', async () => {
    analystService.getAnalyst = jest
      .fn()
      .mockResolvedValueOnce(MockData.analystCreated);

    return request(app.getHttpServer())
      .get(`/users/${MockData.analystCreated._id}`)
      .expect(200)
      .expect((response) => {
        expect(response.body.contact.phone).toBe('54991083039');
        expect(response.body.contact.email).toBe('rm353710@fiap.com.br');
        expect(response.body.contact.contactPreference).toBe('email');
        expect(response.body._id).toBe('ef83a2f7-048c-42a1-b610-f533abbd607c');
        expect(response.body.fullname).toBe('Paulo da Luz');
        expect(response.body.birthDay).toBe('25/11/2000');
        expect(response.body.documentNumber).toBe('146.434.650-00');
        expect(response.body.gender).toBe('male');
      });
  });

  it('/POST createAnalyst with 201 ok', async () => {
    analystService.createAnalyst = jest.fn().mockResolvedValueOnce(null);

    return request(app.getHttpServer())
      .post(`/users`)
      .send({
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
      })
      .expect(201);
  });

  it('/POST createAnalyst with missing parameters', async () => {
    analystService.createAnalyst = jest.fn().mockResolvedValueOnce(null);

    return request(app.getHttpServer())
      .post(`/users`)
      .send({
        fullname: 'Paulo da Luz',
      })
      .expect(400);
  });

  it('/PUT updateUser 200 ok', async () => {
    analystService.updateAnalyst = jest.fn().mockImplementation();

    return request(app.getHttpServer())
      .put(`/users/${MockData.analystCreated._id}`)
      .send({
        fullname: 'Paulo da Light',
      })
      .expect(200);
  });

  it('/DELETE deleteUser 200 ok', async () => {
    analystService.deleteAnalyst = jest.fn().mockResolvedValueOnce(null);

    return request(app.getHttpServer())
      .delete(`/users/${MockData.analystCreated._id}`)
      .expect(200);
  });
});
