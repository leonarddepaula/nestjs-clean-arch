import { UserEntity } from '@/users/domain/entities/user.entity'

export type UserOutput = {
  id: string
  name: string
  email: string
  createdAt: Date
  password: string
}

export class UserOutputMapper {
  static toOutput(entity: UserEntity): UserOutput {
    return entity.toJSON()
  }
}
