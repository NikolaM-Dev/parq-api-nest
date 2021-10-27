module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: false,
  logging: false,
  migrations: ['src/database/migrations/*.ts'],
  migrationsTableName: 'migrations',
  entities: ['dist/**/*.entity{.ts,.js}'],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
  ssl: process.env.DYNO ? { rejectUnauthorized: false } : false,
};
