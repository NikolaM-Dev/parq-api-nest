import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), HttpModule],
  providers: [
    UsersService,
    {
      provide: 'API_URL',
      useValue: 'https://maps.googleapis.com/maps/api/geocode/json',
    },
  ],
  controllers: [UsersController],
  exports: [TypeOrmModule, HttpModule, 'API_URL'],
})
export class UsersModule {}
