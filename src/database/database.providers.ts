import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(
        'mongodb://mongo:IXCcAYlGyVNxgHvtuSchJTdQvflXNzjI@junction.proxy.rlwy.net:36263',
      ),
  },
];
