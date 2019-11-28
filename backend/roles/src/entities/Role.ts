import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

import { Permission, RoleNames } from '@backend/common'

import { ROLE_USER, ROLE_SUPPORT } from '@backend/common'
const RoleType = [ROLE_SUPPORT, ROLE_USER]

@Entity()
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column('jsonb', { default: [], nullable: true })
  permissions: Permission[] = []

  @Column('enum', { enum: RoleType, unique: true })
  role: RoleNames
}
