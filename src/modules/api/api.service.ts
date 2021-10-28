import { AxiosResponse } from 'axios';
import { ConfigType } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { Injectable, Inject } from '@nestjs/common';
import { Observable, lastValueFrom } from 'rxjs';

import { GeolocationAPI } from '../users/models';
import { User } from '../users/entities/user.entity';
import config from '../../app.config';

@Injectable()
export class ApiService {
  constructor(
    private readonly httpService: HttpService,
    @Inject('API_URL') private readonly apiURL: string,
    @Inject(config.KEY)
    private readonly configService: ConfigType<typeof config>,
  ) {}

  async getGeolocation(user: User): Promise<GeolocationAPI> {
    const apiKey = this.configService.apiKey;
    const address = encodeURIComponent(`${user.ciudad} ${user.direccion}`);
    const coordinates: Observable<AxiosResponse<GeolocationAPI>> =
      await this.httpService.get(
        `${this.apiURL}?address=${address}&key=${apiKey}`,
      );

    const { data } = await lastValueFrom(coordinates);

    return data;
  }
}
