import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
// import { Floor } from '../../floors/entities/floor.entity';
// import { Panel } from '../../panels/entities/panel.entity';

@Entity('projects')
export class Project extends BaseEntity {
  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  // Relationships
  // @ManyToOne(() => User, (user) => user.projects, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  // @OneToMany(() => Floor, (floor) => floor.project)
  // floors: Floor[];

  // @OneToMany(() => Panel, (panel) => panel.project)
  // panels: Panel[];
}