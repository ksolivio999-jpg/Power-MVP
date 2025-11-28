import { IsNotEmpty, IsOptional, IsString, IsUUID, IsBoolean, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCircuitDto {
  @ApiProperty({ description: 'ID of the breaker this circuit is connected to', example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsNotEmpty()
  @IsUUID()
  breakerId: string;

  @ApiProperty({ description: 'Circuit name or identifier', example: 'Kitchen Outlets', maxLength: 255 })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiProperty({ description: 'Room or area the circuit serves', example: 'Kitchen', maxLength: 255, required: false })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  room?: string;

  @ApiProperty({ description: 'Description of the electrical load', example: 'Countertop outlets', required: false })
  @IsOptional()
  @IsString()
  loadDescription?: string;

  @ApiProperty({ description: 'Whether this is a dedicated circuit', example: false, required: false, default: false })
  @IsOptional()
  @IsBoolean()
  isDedicated?: boolean = false;

  @ApiProperty({ description: 'Additional notes about the circuit', required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}