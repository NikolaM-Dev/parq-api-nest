import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { CreateUserDto, GeolocationDto, UpdateUserDto } from './dtos';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOkResponse({ type: [User] })
  async findMany(): Promise<User[]> {
    return await this.usersService.findMany();
  }

  @Get(':id')
  @ApiOkResponse({ type: User })
  async findById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return await this.usersService.findById(id);
  }

  @Post()
  @ApiCreatedResponse({ type: User })
  async create(
    @Body() payload: CreateUserDto,
    @Query() params: GeolocationDto,
  ): Promise<User> {
    return await this.usersService.create(payload, params);
  }

  @Put(':id')
  @ApiCreatedResponse({ type: User })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateUserDto,
  ): Promise<User> {
    return await this.usersService.update(id, payload);
  }

  @Delete(':id')
  @ApiOkResponse({ type: User })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return await this.usersService.remove(id);
  }
}
