import { AnalystService } from '../../../src/services/analyst.service';
import Mock from '../../mock/analyst.mock';
import { AnalystInterface } from '../../../src/interfaces/analyst.interface';
import { Model } from 'mongoose';
import { AnalystRepository } from '../../../src/repository/analyst.repository';

let analystModel: Model<AnalystInterface>;
const analystRepository = new AnalystRepository(analystModel);

const analystService = new AnalystService(analystRepository);

describe('UserService test', () => {
  beforeEach(async () => {
    jest.fn().mockClear();
    jest.clearAllMocks();
    jest.resetModules();

    /*     const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnalystService,
        AnalystRepository,
        ...databaseProviders,
        ...analystProviders,
      ],
    }).compile(); */
  });

  it('get a user', async () => {
    analystRepository.getAnalyst = jest
      .fn()
      .mockResolvedValueOnce(Mock.analystCreated);

    const analyst: any = await analystService.getAnalyst(
      Mock.analystCreated._id,
    );

    expect(analyst._id).toBe(Mock.analystCreated._id);
  });

  it('get 404 when no find a user', async () => {
    analystRepository.getAnalyst = jest.fn().mockResolvedValueOnce(null);

    try {
      await analystService.getAnalyst(Mock.analystCreated._id);
    } catch (error) {
      expect(error.status).toBe(404);
      expect(error.response).toBe('The specified resource is not found.');
    }
  });

  it('get 200 on deleting a user', async () => {
    analystRepository.getAnalyst = jest
      .fn()
      .mockResolvedValueOnce(Mock.analystCreated);
    analystRepository.deleteAnalyst = jest.fn().mockResolvedValueOnce(null);

    const analystDeleted = await analystService.deleteAnalyst(
      Mock.analystCreated._id,
    );

    expect(analystDeleted).toBe(null);
  });

  it('get 404 on deleting a user', async () => {
    analystRepository.getAnalyst = jest.fn().mockResolvedValueOnce(null);

    try {
      await analystService.deleteAnalyst(Mock.analystCreated._id);
    } catch (error) {
      expect(error.status).toBe(404);
      expect(error.response).toBe('The specified resource is not found.');
    }
  });

  it('get 201 on creating a user', async () => {
    analystRepository.createAnalyst = jest.fn().mockResolvedValueOnce(null);

    const analystCreated = await analystService.createAnalyst(
      Mock.analystToCreate as any,
    );
    expect(analystCreated).toBe(null);
  });

  it('get 200 on updating a user', async () => {
    analystRepository.getAnalyst = jest
      .fn()
      .mockResolvedValueOnce(Mock.analystCreated);

    analystRepository.updateAnalyst = jest.fn().mockResolvedValueOnce(null);

    const analystCreated = await analystService.updateAnalyst(
      Mock.analystCreated._id,
      {
        fullname: 'Paulo da Luzzzz',
      },
    );
    expect(analystCreated).toBe(null);
  });

  it('get 400 on updating a user', async () => {
    analystRepository.getAnalyst = jest
      .fn()
      .mockResolvedValueOnce(Mock.analystCreated);

    analystRepository.updateAnalyst = jest.fn().mockResolvedValueOnce(null);

    try {
      await analystService.updateAnalyst(Mock.analystCreated._id, {
        uuid: '6aa23a34-6d76-450f-a633-818ad855ec35',
      });
    } catch (error) {
      expect(error.status).toBe(400);
      expect(error.response).toBe(
        'Client specified an invalid argument, request body or query param.',
      );
    }
  });

  it('get 404 on updating a user', async () => {
    analystRepository.getAnalyst = jest.fn().mockResolvedValueOnce(null);

    analystRepository.updateAnalyst = jest.fn().mockResolvedValueOnce(null);

    try {
      await analystService.updateAnalyst(Mock.analystCreated._id, {
        fullname: 'Paulo da Luzzzz',
      });
    } catch (error) {
      expect(error.status).toBe(404);
      expect(error.response).toBe('The specified resource is not found.');
    }
  });
});
