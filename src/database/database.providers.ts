import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(
        'mongodb://mongo:osRfIQCMLCgIrKKIUHnlOnhTLyxJITDH@junction.proxy.rlwy.net:24693',
      ),
  },
];
