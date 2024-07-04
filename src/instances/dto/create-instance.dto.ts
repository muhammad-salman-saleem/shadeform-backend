import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateInstanceDTO {
  @IsString()
  @IsNotEmpty()
  cloud: string;

  @IsString()
  @IsNotEmpty()
  region: string;

  @IsString()
  @IsNotEmpty()
  shade_instance_type: string;

  @IsBoolean()
  shade_cloud: boolean;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  launch_configuration: string; // This contains a JSON string, validated separately if needed

  @IsString()
  @IsNotEmpty()
  os: string;
}
