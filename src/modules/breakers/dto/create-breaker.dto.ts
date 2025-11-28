import { IsNotEmpty, IsOptional, IsString, IsUUID, IsInt, MaxLength, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBreakerDto {
  @ApiProperty({ description: 'ID of the panel this breaker belongs to', example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsNotEmpty()
  @IsUUID()
  panelId: string;

  @ApiProperty({ description: 'Position/slot number in the panel', example: 1, minimum: 1 })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  position: number;

  @ApiProperty({ description: 'Number of poles (1=Single, 2=Double, 3=Triple)', example: 2, minimum: 1, maximum: 3 })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(3)
  poles: number;

  @ApiProperty({ description: 'Breaker amperage rating', example: 20, minimum: 5, maximum: 400 })
  @IsNotEmpty()
  @IsInt()
  @Min(5)
  @Max(400)
  amperage: number;

  @ApiProperty({ description: 'Breaker type', example: 'Standard', maxLength: 50 })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  type: string;

  @ApiProperty({ description: 'ID of sub-panel this breaker feeds (if applicable)', example: '223e4567-e89b-12d3-a456-426614174001', required: false })
  @IsOptional()
  @IsUUID()
  feedsPanelId?: string;

  @ApiProperty({ description: 'Additional notes about the breaker', required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}