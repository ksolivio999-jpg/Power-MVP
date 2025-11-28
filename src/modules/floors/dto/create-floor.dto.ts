import { IsNotEmpty, IsOptional, IsString, IsUUID, IsInt, MaxLength, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFloorDto {
  @ApiProperty({ description: 'ID of the project this floor belongs to', example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsNotEmpty()
  @IsUUID()
  projectId: string;

  @ApiProperty({ description: 'Floor name or number', example: '1st Floor', maxLength: 255 })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiProperty({ description: 'Display order index for the floor', example: 0, minimum: 0, required: false, default: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  orderIndex?: number = 0;
}