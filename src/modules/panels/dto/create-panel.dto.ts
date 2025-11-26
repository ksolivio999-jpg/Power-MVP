import { IsNotEmpty, IsOptional, IsString, IsUUID, IsInt, MaxLength, Min, IsUrl } from 'class-validator';

export class CreatePanelDto {
  @IsNotEmpty()
  @IsUUID()
  projectId: string;

  @IsNotEmpty()
  @IsUUID()
  floorId: string;

  @IsOptional()
  @IsUUID()
  parentPanelId?: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  location?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  totalSpaces?: number;

  @IsOptional()
  @IsUrl()
  @MaxLength(500)
  photoUrl?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  qrSlug?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}