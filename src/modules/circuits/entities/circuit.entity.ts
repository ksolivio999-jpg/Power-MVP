import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Breaker } from '../../breakers/entities/breaker.entity';

@Entity('circuits')
export class Circuit extends BaseEntity {
  @Column({ name: 'breaker_id', type: 'uuid' })
  breakerId: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  room: string;

  @Column({ name: 'load_description', type: 'text', nullable: true })
  loadDescription: string;

  @Column({ name: 'is_dedicated', type: 'boolean', default: false })
  isDedicated: boolean;

  @Column({ type: 'text', nullable: true })
  notes: string;

  // Relationships
  @ManyToOne(() => Breaker, (breaker) => breaker.circuits, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'breaker_id' })
  breaker: Breaker;
}