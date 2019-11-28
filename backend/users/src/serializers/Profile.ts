import { Injectable } from '@nestjs/common'
import { Profile } from '@backend/common'
import { Profile as ProfileModel } from '../entities'

@Injectable()
export class ProfileSerializer {
  serialize(profileModel: ProfileModel): Profile {
    const { firstName, lastName } = profileModel

    return { firstName, lastName }
  }
}
