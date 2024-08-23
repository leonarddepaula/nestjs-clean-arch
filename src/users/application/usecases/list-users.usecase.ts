import {
  PaginationOutputDto,
  PaginationOutputMapper,
} from '@/shared/application/dtos/pagination-output.dto'
import { SearchInputDto } from '@/shared/application/dtos/search-input.dto'
import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case.interface'
import { UserRepository } from '@/users/domain/repositories/user.repository'
import { UserOutput, UserOutputMapper } from '../dtos/user.output.dto'

export namespace ListUsersUseCase {
  export type Input = SearchInputDto

  export type Output = PaginationOutputDto<UserOutput>

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private readonly userRepository: UserRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const params = new UserRepository.SearchParams(input)
      const searchResult = await this.userRepository.search(params)
      return this.toOutput(searchResult)
    }

    private toOutput(searchResult: UserRepository.SearchResult): Output {
      const items = searchResult.items.map(item =>
        UserOutputMapper.toOutput(item),
      )
      return PaginationOutputMapper.toOutput(items, searchResult)
    }
  }
}
