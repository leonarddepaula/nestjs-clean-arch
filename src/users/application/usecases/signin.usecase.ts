import { InvalidCredentialsError } from '@/shared/application/errors/invalid-credentials-error'
import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case.interface'
import { BadRequestError } from '../../../shared/application/errors/bad-request-error'
import { UserRepository } from '../../domain/repositories/user.repository'
import { UserOutput, UserOutputMapper } from '../dtos/user.output.dto'
import { HashProvider } from './../../../shared/application/providers/hash-provider'

export namespace SigninUseCase {
  export type Input = {
    email: string
    password: string
  }

  export type Output = UserOutput
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private userRepository: UserRepository.Repository,
      private hashProvider: HashProvider,
    ) {}
    async execute(input: Input): Promise<Output> {
      const { email, password } = input

      if (!email || !password) {
        throw new BadRequestError(
          'Email and password are required - fill in all fields',
        )
      }
      const entity = await this.userRepository.findByEmail(email)

      const hasPasswordMatches = await this.hashProvider.compareHash(
        password,
        entity.password,
      )
      if (!hasPasswordMatches) {
        throw new InvalidCredentialsError('Invalid credentials')
      }

      return UserOutputMapper.toOutput(entity)
    }
  }
}
