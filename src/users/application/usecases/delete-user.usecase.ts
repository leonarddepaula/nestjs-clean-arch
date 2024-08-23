import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case.interface'
import { UserRepository } from '@/users/domain/repositories/user.repository'

export namespace DeleteUserUseCase {
  export type Input = {
    id: string
  }

  export type Output = void

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private readonly userRepository: UserRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      await this.userRepository.delete(input.id)
    }
  }
}