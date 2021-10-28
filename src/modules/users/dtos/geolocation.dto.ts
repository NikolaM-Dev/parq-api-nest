import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

export class GeolocationDto {
  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  readonly geolocation: boolean;
}
