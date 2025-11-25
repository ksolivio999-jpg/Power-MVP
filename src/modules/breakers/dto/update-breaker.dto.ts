import { PartialType } from '@nestjs/mapped-types';
import { CreateBreakerDto } from './create-breaker.dto';

export class UpdateBreakerDto extends PartialType(CreateBreakerDto) {}