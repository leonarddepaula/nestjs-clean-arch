import { UserEntity } from '@/users/domain/entities/user.entity'
import { UserRepository } from '../../domain/repositories/user.repository'
import { UserOutput } from '../dtos/user.output.dto'
import { BadRequestError } from '../errors/bad-request-error'
import { HashProvider } from './../../../shared/application/providers/hash-provider'

export namespace SignupUseCase {
  export type Input = {
    name: string
    email: string
    password: string
  }

  export type Output = UserOutput
  export class UseCase {
    constructor(
      private userRepository: UserRepository.Repository,
      private hashProvider: HashProvider,
    ) {}
    async execute(input: Input): Promise<Output> {
      const { name, email, password } = input

      if (!name || !email || !password) {
        throw new BadRequestError(
          'Name, email and password are required - fill in all fields',
        )
      }
      await this.userRepository.emailExists(email)

      const hasPassword = await this.hashProvider.generateHash(password)

      const entity = new UserEntity(
        Object.assign(input, {
          password: await this.hashProvider.generateHash(hasPassword),
        }),
      )

      await this.userRepository.insert(entity)
      return entity.toJSON()
    }
  }
}
