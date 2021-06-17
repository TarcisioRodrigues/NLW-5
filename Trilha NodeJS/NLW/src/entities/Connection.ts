import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { User } from './User';
@Entity('settings')
class Connection {
  @PrimaryColumn()
  id: string;

  @Column()
  admin_id: string;

  @Column()
  socket_id: string;

  @Column()
  user_id: string;

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => User)
  user: User;

  @UpdateDateColumn()
  update_at: Date;

  @CreateDateColumn()
  created_at: Date;

  //gerando o id
  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Connection };
