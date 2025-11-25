import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Project } from '../../projects/entities/project.entity';
import { Floor } from '../../floors/entities/floor.entity';
// import { Breaker } from '../../breakers/entities/breaker.entity';

@Entity('panels')
export class Panel extends BaseEntity {
  @Column({ name: 'project_id', type: 'uuid' })
  projectId: string;

  @Column({ name: 'floor_id', type: 'uuid' })
  floorId: string;

  @Column({ name: 'parent_panel_id', type: 'uuid', nullable: true })
  parentPanelId: string | null;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  location: string;

  @Column({ name: 'total_spaces', type: 'int', nullable: true })
  totalSpaces: number;

  @Column({ name: 'photo_url', type: 'varchar', length: 500, nullable: true })
  photoUrl: string;

  @Column({ name: 'qr_slug', type: 'varchar', length: 100, unique: true, nullable: true })
  qrSlug: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  // Relationships
  // @ManyToOne(() => Project, (project) => project.panels, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'project_id' })
  project: Project;

  // @ManyToOne(() => Floor, (floor) => floor.panels, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'floor_id' })
  floor: Floor;

  @ManyToOne(() => Panel, (panel) => panel.subpanels, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'parent_panel_id' })
  parentPanel: Panel | null;

  @OneToMany(() => Panel, (panel) => panel.parentPanel)
  subpanels: Panel[];

  // @OneToMany(() => Breaker, (breaker) => breaker.panel)
  // breakers: Breaker[];
}