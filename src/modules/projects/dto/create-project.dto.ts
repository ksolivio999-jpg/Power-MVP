import { IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({ description: 'ID of the user who owns this project', example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @ApiProperty({ description: 'Project name', example: 'Downtown Office Building', maxLength: 255 })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiProperty({ description: 'Project address', example: '123 Main St, New York, NY 10001', required: false })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ description: 'Additional notes about the project', required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}