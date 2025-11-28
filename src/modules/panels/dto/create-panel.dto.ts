import { IsNotEmpty, IsOptional, IsString, IsUUID, IsInt, MaxLength, Min, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePanelDto {
  @ApiProperty({ description: 'ID of the project this panel belongs to', example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsNotEmpty()
  @IsUUID()
  projectId: string;

  @ApiProperty({ description: 'ID of the floor this panel is located on', example: '223e4567-e89b-12d3-a456-426614174001' })
  @IsNotEmpty()
  @IsUUID()
  floorId: string;

  @ApiProperty({ description: 'ID of parent panel if this is a sub-panel', example: '323e4567-e89b-12d3-a456-426614174002', required: false })
  @IsOptional()
  @IsUUID()
  parentPanelId?: string;

  @ApiProperty({ description: 'Panel name or identifier', example: 'Main Panel A', maxLength: 255 })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiProperty({ description: 'Physical location of the panel', example: 'Electrical Room', maxLength: 255, required: false })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  location?: string;

  @ApiProperty({ description: 'Total number of breaker spaces in panel', example: 42, minimum: 1, required: false })
  @IsOptional()
  @IsInt()
  @Min(1)
  totalSpaces?: number;

  @ApiProperty({ description: 'URL to panel photo', example: 'https://example.com/photos/panel.jpg', maxLength: 500, required: false })
  @IsOptional()
  @IsUrl()
  @MaxLength(500)
  photoUrl?: string;

  @ApiProperty({ description: 'QR code slug for quick access', example: 'main-panel-a', maxLength: 100, required: false })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  qrSlug?: string;

  @ApiProperty({ description: 'Additional notes about the panel', required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}