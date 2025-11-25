import { IsString, IsUUID, IsBoolean, IsOptional } from 'class-validator';

export class CreateCircuitDto {
  @IsUUID()
  breakerId: string;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  room?: string;

  @IsString()
  @IsOptional()
  loadDescription?: string;

  @IsBoolean()
  @IsOptional()
  isDedicated?: boolean;

  @IsString()
  @IsOptional()
  notes?: string;
}