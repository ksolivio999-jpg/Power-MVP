import { IsNotEmpty, IsOptional, IsString, IsUUID, IsBoolean, MaxLength } from 'class-validator';

export class CreateCircuitDto {
  @IsNotEmpty()
  @IsUUID()
  breakerId: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  room?: string;

  @IsOptional()
  @IsString()
  loadDescription?: string;

  @IsOptional()
  @IsBoolean()
  isDedicated?: boolean = false;

  @IsOptional()
  @IsString()
  notes?: string;
}