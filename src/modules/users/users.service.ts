import { AxiosResponse } from 'axios';
import { ConfigType } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { lastValueFrom, Observable } from 'rxjs';
import { Repository } from 'typeorm';

import config from '../../app.config';

import { CreateUserDto, GeolocationDto } from './dtos';
import { EstadoGeo, GeolocationAPI } from './models';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    private readonly httpService: HttpService,
    @Inject('API_URL') private readonly API_URL: string,
    @Inject(config.KEY)
    private readonly configService: ConfigType<typeof config>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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
    if (!params) return newUser;

    const { geolocation } = params;

    if (geolocation) return await this.addCoordinates(newUser);
  }

  async update(id: number, payload: UpdateUserDto): Promise<User> {
    const user = await this.findById(id);

    this.userRepository.merge(user, payload);

    return await this.userRepository.save(user);
  }

  private async addCoordinates(user: User): Promise<User> {
    const API_KEY = this.configService.apiKey;
    const address = encodeURIComponent(`${user.ciudad} ${user.direccion}`);
    const coordinates: Observable<AxiosResponse<GeolocationAPI>> =
      await this.httpService.get(
        `${this.API_URL}?address=${address}&key=${API_KEY}`,
      );

    const { data } = await lastValueFrom(coordinates);

    if (!(data.status === 'OK')) {
      user.latitud = 0;
      user.longitud = 0;
      user.estadogeo = EstadoGeo.F;
    } else {
      const { lat, lng } = data.results[0].geometry.location;

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
