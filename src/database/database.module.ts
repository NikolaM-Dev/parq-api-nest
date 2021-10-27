import { ConfigType } from '@nestjs/config';
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { getSsl } from '../common/get-ssl';
import config from '../app.config';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof config>) => {
        const ssl = getSsl();

        return {
          entities: ['dist/**/*.entity{.ts,.js}'],
          retryAttempts: 10,
          retryDelay: 3000,
          ssl,
          type: 'postgres',
          url: configService.databaseUrl,
        };
      },
      inject: [config.KEY],
    }),
  ],
})
export class DatabaseModule {}
