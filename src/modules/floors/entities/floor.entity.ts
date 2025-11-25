import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Project } from '../../projects/entities/project.entity';
// import { Panel } from '../../panels/entities/panel.entity';

@Entity('floors')
export class Floor extends BaseEntity {
  @Column({ name: 'project_id', type: 'uuid' })
  projectId: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ name: 'order_index', type: 'int', default: 0 })
  orderIndex: number;

  // Relationships
  // @ManyToOne(() => Project, (project) => project.floors, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'project_id' })
  project: Project;

  // @OneToMany(() => Panel, (panel) => panel.floor)
  // panels: Panel[];
}