import { IsString, IsUUID, IsOptional } from 'class-validator';

export class CreateProjectDto {
  @IsUUID()
  userId: string;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  notes?: string;
}