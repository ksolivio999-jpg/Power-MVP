import { IsString, IsUUID, IsInt, IsOptional } from 'class-validator';

export class CreateFloorDto {
  @IsUUID()
  projectId: string;

  @IsString()
  name: string;

  @IsInt()
  @IsOptional()
  orderIndex?: number;
}