import { IsString, IsUUID, IsInt, IsOptional } from 'class-validator';

export class CreateBreakerDto {
  @IsUUID()
  panelId: string;

  @IsInt()
  position: number;

  @IsInt()
  poles: number;

  @IsInt()
  amperage: number;

  @IsString()
  type: string;

  @IsUUID()
  @IsOptional()
  feedsPanelId?: string;

  @IsString()
  @IsOptional()
  notes?: string;
}