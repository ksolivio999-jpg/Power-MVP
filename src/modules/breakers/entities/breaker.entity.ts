import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Circuit } from '../../circuits/entities/circuit.entity';

@Entity('breakers')
export class Breaker extends BaseEntity {
  @Column({ name: 'panel_id', type: 'uuid' })
  panelId: string;

  @Column({ type: 'int' })
  position: number;

  @Column({ type: 'int' })
  poles: number;

  @Column({ type: 'int' })
  amperage: number;

  @Column({ type: 'varchar', length: 50 })
  type: string;

  @Column({ name: 'feeds_panel_id', type: 'uuid', nullable: true })
  feedsPanelId: string | null;

  @Column({ type: 'text', nullable: true })
  notes: string;

  // Relationships
  @ManyToOne('Panel', 'breakers', { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'panel_id' })
  panel: any;

  @ManyToOne('Panel', { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'feeds_panel_id' })
  feedsPanel: any | null;

  @OneToMany(() => Circuit, (circuit) => circuit.breaker)
  circuits: Circuit[];
}