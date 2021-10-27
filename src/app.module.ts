import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import * as Joi from 'joi';

import { DatabaseModule } from './database/database.module';
import { enviroments } from './app.enviroments';
import { ModulesModule } from './modules/modules.module';
import config from './app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    ModulesModule,
  ],
})
export class AppModule {}
