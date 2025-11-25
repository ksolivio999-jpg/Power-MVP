import { IsString, IsUUID, IsInt, IsOptional } from 'class-validator';

export class CreatePanelDto {
  @IsUUID()
  projectId: string;

  @IsUUID()
  floorId: string;

  @IsUUID()
  @IsOptional()
  parentPanelId?: string;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsInt()
  @IsOptional()
  totalSpaces?: number;

  @IsString()
  @IsOptional()
  photoUrl?: string;

  @IsString()
  @IsOptional()
  qrSlug?: string;

  @IsString()
  @IsOptional()
  notes?: string;
}