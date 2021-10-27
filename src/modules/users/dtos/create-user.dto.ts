import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly nombre: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly apellido: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly direccion: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly ciudad: string;
}
