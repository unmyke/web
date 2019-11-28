import {
  PrimaryColumn,
  Entity,
  Column,
  OneToOne,
  ManyToOne,
  JoinColumn,
} from 'typeorm'

import { RoleModel as Role } from '@backend/roles'
import { Profile } from './Profile'

@Entity()
export class User {
  @PrimaryColumn('uuid')
  id: string

  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @OneToOne(type => Profile, { nullable: true })
  @JoinColumn()
  profile?: Profile | null

  @ManyToOne(type => Role)
  @JoinColumn()
  role: Role

  @Column({ nullable: true })
  lastLoginAt?: Date
}
