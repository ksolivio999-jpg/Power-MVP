import { PartialType } from '@nestjs/swagger';
import { CreateBreakerDto } from './create-breaker.dto';

export class UpdateBreakerDto extends PartialType(CreateBreakerDto) {}