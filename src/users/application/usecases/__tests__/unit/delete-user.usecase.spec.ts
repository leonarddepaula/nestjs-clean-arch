import { BadRequestError } from '@/shared/application/errors/bad-request-error'
import { UserEntity } from '@/users/domain/entities/user.entity'
import { UserDataBuilder } from '@/users/domain/testing/helpers/user-data-builder'
import { UserInMemoryRepository } from '@/users/infrastructure/database/in-memory/repositories/user-in-momory.repository'
import { DeleteUserUseCase } from '../../delete-user.usecase'

describe('DeleteUserUsecase', () => {
  let sut: DeleteUserUseCase.UseCase
  let repository: UserInMemoryRepository

  beforeEach(() => {
    repository = new UserInMemoryRepository()
    sut = new DeleteUserUseCase.UseCase(repository)
  })
  it('Should throws an error if user does not exists', async () => {
    await expect(sut.execute({ id: 'invalid_id' })).rejects.toThrow(
      new BadRequestError('Entity not found'),
    )
  })

  it('Should delete a user', async () => {
    const spyDelete = jest.spyOn(repository, 'delete')
    const items = [new UserEntity(UserDataBuilder({}))]
    repository.items = items

    expect(repository.items).toHaveLength(1)
    await sut.execute({ id: items[0].id })
    expect(spyDelete).toHaveBeenCalledTimes(1)
    expect(repository.items).toHaveLength(0)
  })
})
