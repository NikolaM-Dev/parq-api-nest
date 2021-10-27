import { ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';

import { CreateUserDto, UpdateUserDto } from './dtos';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findMany(): Promise<User[]> {
    return await this.usersService.findMany();
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return await this.usersService.findById(id);
  }

  @Post()
  async create(@Body() payload: CreateUserDto): Promise<User> {
    return await this.usersService.create(payload);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateUserDto,
  ): Promise<User> {
    return await this.usersService.update(id, payload);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return await this.usersService.remove(id);
  }
}
