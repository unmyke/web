import { Injectable } from '@nestjs/common'

import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User as UserModel, Profile as ProfileModel } from '../entities'
import { RoleModel } from '@backend/roles'
import { UserSerializer } from '../serializers'

import {
  checkUserExists,
  getUserWithProfile,
  getUserWithoutProfile,
} from './helpers'

import { Uuid, Email, UserNotFoundError } from '@backend/common'
import { ProfileExistsError, ProfileNotFoundError } from '../errors'

import { User, Profile, ROLE_USER, ROLE_SUPPORT } from '@backend/common'
import { UserWithProfile, UserWithoutProfile } from '../types'

@Injectable()
export class UserService {
  private userRoleModelPromise: Promise<RoleModel>

  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
    @InjectRepository(ProfileModel)
    private readonly profileRepository: Repository<ProfileModel>,
    @InjectRepository(RoleModel)
    private readonly roleRepository: Repository<RoleModel>,
    private readonly userSerializer: UserSerializer,
  ) {}

  createUser({
    id,
    email,
    password,
  }: {
    id: Uuid
    email: Email
    password: string
  }): Promise<UserWithoutProfile> {
    return this.getUserRoleModelPromise()
      .then(
        (userRole: RoleModel): Promise<UserModel> => {
          const user = new UserModel()
          user.id = id
          user.email = email
          user.password = password
          user.role = userRole

          return this.userRepository.save(user)
        },
      )
      .then(this.serialize)
      .then(getUserWithoutProfile)
  }

  getUserById(id: string): Promise<User> {
    return this.getById(id).then(this.serialize)
  }

  getUsers(): Promise<User[]> {
    return this.userRepository
      .find({ relations: ['profile', 'role'] })
      .then((userModels: UserModel[]): User[] => userModels.map(this.serialize))
  }

  getSupportUsers(): Promise<User[]> {
    return this.userRepository
      .find({
        where: { role: { role: ROLE_SUPPORT } },
        relations: ['role'],
      })
      .then((supportUserModels: UserModel[]): User[] =>
        supportUserModels.map(this.serialize),
      )
  }

  userExistByEmail(email: Email): Promise<boolean> {
    return this.getUserByEmail(email).then(
      () => true,
      (error: Error): boolean => {
        if (error instanceof UserNotFoundError) {
          return false
        }

        throw error
      },
    )
  }

  getUserByEmail(email: Email): Promise<User> {
    return this.userRepository
      .findOne({
        where: { email },
        relations: ['profile', 'role'],
      })
      .then(checkUserExists)
      .then(this.serialize)
  }

  updateEmail(id: string, email: Email): Promise<User> {
    return this.updateField('email')(id, email)
  }

  updatePassword(id: string, password: string): Promise<User> {
    return this.updateField('password')(id, password)
  }

  updateLastLoginAt(id: string): Promise<User> {
    return this.updateField('lastLoginAt')(id, new Date())
  }

  createProfile(
    userId: string,
    { firstName, lastName }: Profile,
  ): Promise<UserWithProfile> {
    return this.getById(userId)
      .then(
        (userModel: UserModel): Promise<[UserModel, ProfileModel]> => {
          if (userModel.profile) {
            throw new ProfileExistsError()
          }

          const profileModel = new ProfileModel()
          profileModel.firstName = firstName
          profileModel.lastName = lastName

          return Promise.all([
            Promise.resolve(userModel),
            this.profileRepository.save(profileModel),
          ])
        },
      )
      .then(
        ([userModel, savedProfileModel]: [UserModel, ProfileModel]): Promise<
          UserModel
        > => {
          userModel.profile = savedProfileModel
          return this.userRepository.save(userModel)
        },
      )
      .then(this.serialize)
      .then(getUserWithProfile)
  }

  updateProfile(
    userId: string,
    { firstName, lastName }: Partial<Profile>,
  ): Promise<UserWithProfile> {
    return this.getById(userId)
      .then(
        (userModel: UserModel): Promise<[UserModel, ProfileModel]> => {
          if (!userModel.profile) {
            throw new ProfileNotFoundError()
          }

          if (firstName) {
            userModel.profile.firstName = firstName
          }
          if (lastName) {
            userModel.profile.lastName = lastName
          }

          return Promise.all([
            Promise.resolve(userModel),
            this.profileRepository.save(userModel.profile),
          ])
        },
      )
      .then(([userModel]: [UserModel, ProfileModel]): UserModel => userModel)
      .then(this.serialize)
      .then(getUserWithProfile)
  }

  deleteProfile(userId: string): Promise<UserWithoutProfile> {
    return this.getById(userId)
      .then(
        (userModel: UserModel): Promise<UserModel> => {
          if (!userModel.profile) {
            throw new ProfileNotFoundError()
          }
          userModel.profile = null

          return this.userRepository.save(userModel)
        },
      )
      .then(this.serialize)
      .then(getUserWithoutProfile)
  }

  private serialize = (userModel: UserModel): User => {
    return this.userSerializer.serialize(userModel)
  }

  private getById(id: string): Promise<UserModel> {
    return this.userRepository
      .findOne({ where: { id }, relations: ['profile', 'role'] })
      .then(checkUserExists)
  }

  private updateField = <Field extends 'email' | 'password' | 'lastLoginAt'>(
    field: Field,
  ) => (id: string, value: UserModel[Field]): Promise<User> => {
    return this.getById(id)
      .then(
        (userModel: UserModel): Promise<UserModel> => {
          userModel[field] = value

          return this.userRepository.save(userModel)
        },
      )
      .then(this.serialize)
  }

  private getUserRoleModelPromise(): Promise<RoleModel> {
    if (!this.userRoleModelPromise) {
      this.userRoleModelPromise = this.roleRepository
        .findOne({
          where: { role: ROLE_USER },
        })
        .then((userRole: RoleModel | null | undefined) => {
          if (!userRole) {
            throw new ProfileNotFoundError()
          }
          return userRole
        })
    }

    return this.userRoleModelPromise
  }
}
