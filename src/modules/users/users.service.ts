import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dtos';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findMany(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOne(id);

    if (!user) throw new NotFoundException(`User with id ${id} not found`);

    return user;
  }

  async create(payload: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(payload);

    return await this.userRepository.save(newUser);
  }

  async update(id: number, payload: UpdateUserDto): Promise<User> {
    const user = await this.findById(id);

    this.userRepository.merge(user, payload);

    return await this.userRepository.save(user);
  }

  async remove(id: number): Promise<User> {
    const user = await this.findById(id);

    await this.userRepository.delete(id);

    return user;
  }
}
