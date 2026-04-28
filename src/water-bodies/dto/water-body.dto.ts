import { IsOptional, IsString, IsNumber, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class PassportDto {
  @IsOptional()
  @IsNumber()
  depth?: number;

  @IsOptional()
  @IsNumber()
  area?: number;

  @IsOptional()
  @IsString()
  bio?: string;
}

export class CreateWaterBodyDto {
  @IsString()
  name: string;

  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;

  @IsString()
  region: string;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => PassportDto)
  passport?: PassportDto;
}

export class UpdateWaterBodyDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  latitude?: number;

  @IsOptional()
  @IsNumber()
  longitude?: number;

  @IsOptional()
  @IsString()
  region?: string;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => PassportDto)
  passport?: PassportDto;
}