import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { ApiService } from './api.service';

@Module({
  imports: [HttpModule],
  providers: [
    ApiService,
    {
      provide: 'API_URL',
      useValue: 'https://maps.googleapis.com/maps/api/geocode/json',
    },
  ],
  exports: [HttpModule, 'API_URL', ApiService],
})
export class ApiModule {}
