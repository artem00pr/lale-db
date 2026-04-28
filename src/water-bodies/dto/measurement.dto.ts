import { IsOptional, IsNumber, IsDateString } from 'class-validator';

export class CreateMeasurementDto {
  @IsOptional()
  @IsNumber()
  ph?: number;

  @IsOptional()
  @IsNumber()
  mineral?: number;

  @IsOptional()
  @IsNumber()
  salinity?: number;

  @IsOptional()
  @IsNumber()
  hardness?: number;

  @IsOptional()
  @IsDateString()
  date?: string;        // ISO формат даты
}