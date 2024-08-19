import { UserEntity } from '@/users/domain/entities/user.entity'
import { UserRepository } from '../../domain/repositories/user.repository'
import { BadRequestError } from '../errors/bad-request-error'

export namespace SignUpUseCase {
  export type Input = {
    name: string
    email: string
    password: string
  }

  export type Output = {
    id: string
    name: string
    email: string
    password: string
    creayedAt?: Date
  }
  export class UseCase {
    constructor(private readonly userRepository: UserRepository.Repository) {}
    async execute(input: Input): Promise<Output> {
      const { name, email, password } = input

      if (!name || !email || !password) {
        throw new BadRequestError(
          'Name, email and password are required - fill in all fields',
        )
      }
      await this.userRepository.emailExists(email)

      const entity = new UserEntity(input)

      await this.userRepository.insert(entity)
      return entity.toJSON()
    }
  }
}
