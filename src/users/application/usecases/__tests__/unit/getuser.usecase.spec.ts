import { BadRequestError } from '@/shared/application/errors/bad-request-error'
import { UserEntity } from '@/users/domain/entities/user.entity'
import { UserDataBuilder } from '@/users/domain/testing/helpers/user-data-builder'
import { UserInMemoryRepository } from '@/users/infrastructure/database/in-memory/repositories/user-in-momory.repository'
import { GetUserUseCase } from '../../getuser.usecase'
describe('GetUserUsecase', () => {
  let sut: GetUserUseCase.UseCase
  let repository: UserInMemoryRepository

  beforeEach(() => {
    repository = new UserInMemoryRepository()
    sut = new GetUserUseCase.UseCase(repository)
  })
  it('Should throws an error if user does not exists', async () => {
    await expect(sut.execute({ id: 'invalid_id' })).rejects.toThrow(
      new BadRequestError('Entity not found'),
    )
  })

  it('Should be able to get user profile', async () => {
    const spyFindById = jest.spyOn(repository, 'findById')
    const items = [new UserEntity(UserDataBuilder({}))]
    repository.items = items

    const result = await sut.execute({ id: items[0].id })

    expect(spyFindById).toHaveBeenCalledTimes(1)
    expect(result).toEqual(items[0].toJSON())
    //console.log(result)
  })
})
