import { Connection } from 'mongoose';
import { AnalystSchema } from '../schemas/analyst.schema';

export const analystProviders = [
  {
    provide: 'ANALYST_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Analyst', AnalystSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
