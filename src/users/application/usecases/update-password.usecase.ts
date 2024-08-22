import { InvalidPasswordError } from '@/shared/application/errors/invalid-password-error'
import { HashProvider } from '@/shared/application/providers/hash-provider'
import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case.interface'
import { UserRepository } from '@/users/domain/repositories/user.repository'
import { UserOutput, UserOutputMapper } from '../dtos/user.output.dto'

export namespace UpdatePasswordUserUseCase {
  export type Input = {
    id: string
    password: string
    oldPassword: string
  }

  export type Output = UserOutput

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private readonly userRepository: UserRepository.Repository,
      private readonly hashProvider: HashProvider,
    ) {}

    async execute(input: Input): Promise<Output> {
      const entity = await this.userRepository.findById(input.id)
      if (!input.password || !input.oldPassword) {
        throw new InvalidPasswordError(
          'Old password and new password are required',
        )
      }

      const checkOldPassword = await this.hashProvider.compareHash(
        input.oldPassword,
        entity.password,
      )
      if (!checkOldPassword) {
        throw new InvalidPasswordError('Old password does not match')
      }

      const hashePassword = await this.hashProvider.generateHash(input.password)
      entity.updatePassword(hashePassword)
      await this.userRepository.update(entity)
      return UserOutputMapper.toOutput(entity)
    }
  }
}
