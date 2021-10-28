import { Module } from '@nestjs/common';

import { ApiModule } from './api/api.module';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';

@Module({
  imports: [UsersModule, ApiModule],
  providers: [UsersService],
})
export class ModulesModule {}
