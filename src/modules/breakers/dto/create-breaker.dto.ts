import { IsNotEmpty, IsOptional, IsString, IsUUID, IsInt, MaxLength, Min, Max } from 'class-validator';

export class CreateBreakerDto {
  @IsNotEmpty()
  @IsUUID()
  panelId: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  position: number;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(3)
  poles: number;

  @IsNotEmpty()
  @IsInt()
  @Min(5)
  @Max(400)
  amperage: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  type: string;

  @IsOptional()
  @IsUUID()
  feedsPanelId?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}