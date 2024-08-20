import { SearchInputDto } from '@/shared/application/dtos/search-input.dto'
import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case.interface'
import { UserRepository } from '@/users/domain/repositories/user.repository'

export namespace ListUsersUseCase {
  export type Input = SearchInputDto

  export type Output = void

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private readonly userRepository: UserRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const params = new UserRepository.SearchParams(input)
      const entity = await this.userRepository.search(params)
      return
    }
  }
}
