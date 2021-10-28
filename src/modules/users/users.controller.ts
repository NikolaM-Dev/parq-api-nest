import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
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
  @ApiOperation({ summary: 'List of users' })
  async findMany(): Promise<User[]> {
    return await this.usersService.findMany();
  }

  @Get('coordinates')
  @ApiOkResponse({ type: User })
  @ApiOperation({
    summary: 'Calculates the coordinates of the users and returns them',
  })
  async findCoordinates(): Promise<User[]> {
    return await this.usersService.findCoordinates();
  }

  @Get(':id')
  @ApiOkResponse({ type: User })
  @ApiOperation({ summary: 'Find a product by ID' })
  async findById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return await this.usersService.findById(id);
  }

  @Post()
  @ApiCreatedResponse({ type: User })
  @ApiOperation({
    summary:
      'Create a user, If the geolocation parameter is set to true, it will calculate its coordinates automatically',
  })
  async create(
    @Body() payload: CreateUserDto,
    @Query() params: GeolocationDto,
  ): Promise<User> {
    return await this.usersService.create(payload, params);
  }

  @Put(':id')
  @ApiCreatedResponse({ type: User })
  @ApiOperation({ summary: 'Update a product by ID' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateUserDto,
  ): Promise<User> {
    return await this.usersService.update(id, payload);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a product by ID' })
  @ApiOkResponse({ type: User })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return await this.usersService.remove(id);
  }
}
