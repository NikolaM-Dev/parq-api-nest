import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { initSwagger } from './app.swagger';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  initSwagger(app);

  await app.listen(process.env.PORT || 3000);
  logger.log(`Server is running at ${await app.getUrl()}`);
}
bootstrap();
