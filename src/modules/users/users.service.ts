import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ApiService } from '../api/api.service';

import { CreateUserDto, GeolocationDto } from './dtos';
import { EstadoGeo } from './models';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly apiService: ApiService,
  ) {}

  async findMany(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findCoordinates(): Promise<User[]> {
    const users = await this.findMany();

    users.forEach(async (user) => {
      if (user.estadogeo) return;
      await this.addCoordinates(user);
    });

    return await this.findMany();
  }

  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOne(id);

    if (!user) throw new NotFoundException(`User with id ${id} not found`);

    return user;
  }

  async create(payload: CreateUserDto, params?: GeolocationDto): Promise<User> {
    const newUser = this.userRepository.create(payload);

    await this.userRepository.save(newUser);
    const { geolocation } = params;

    if (!geolocation) return newUser;

    return await this.addCoordinates(newUser);
  }

  async update(id: number, payload: UpdateUserDto): Promise<User> {
    const user = await this.findById(id);

    this.userRepository.merge(user, payload);

    return await this.userRepository.save(user);
  }

  private async addCoordinates(user: User): Promise<User> {
    const geolocation = await this.apiService.getGeolocation(user);

    if (!(geolocation.status === 'OK')) {
      user.latitud = 0;
      user.longitud = 0;
      user.estadogeo = EstadoGeo.F;
    } else {
      const { lat, lng } = geolocation.results[0].geometry.location;

      user.latitud = lat;
      user.longitud = lng;
      user.estadogeo = EstadoGeo.A;
    }

    return await this.userRepository.save(user);
  }

  async remove(id: number): Promise<User> {
    const user = await this.findById(id);

    await this.userRepository.delete(id);

    return user;
  }
}
