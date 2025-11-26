import { IsNotEmpty, IsOptional, IsString, IsUUID, IsInt, MaxLength, Min } from 'class-validator';

export class CreateFloorDto {
  @IsNotEmpty()
  @IsUUID()
  projectId: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  orderIndex?: number = 0;
}