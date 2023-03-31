import { createConnection } from 'mongoose';

export const db = createConnection(
  process.env.DB_URI ?? '',
  {
    dbName: 'restox',
    autoCreate: true,
  },
);
