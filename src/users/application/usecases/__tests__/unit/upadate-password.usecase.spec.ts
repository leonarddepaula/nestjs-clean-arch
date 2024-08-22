import { BadRequestError } from '@/shared/application/errors/bad-request-error'
import { NotFoundError } from '@/shared/domain/errors/not-found-error'
import { UserEntity } from '@/users/domain/entities/user.entity'
import { UserDataBuilder } from '@/users/domain/testing/helpers/user-data-builder'
import { UserInMemoryRepository } from '@/users/infrastructure/database/in-memory/repositories/user-in-momory.repository'
describe('UpdateUserUsecase', () => {
  let sut: UpdatePasswordUserUseCase.UseCase
  let repository: UserInMemoryRepository

  beforeEach(() => {
    repository = new UserInMemoryRepository()
    sut = new UpdatePasswordUserUseCase.UseCase(repository)
  })
  it('Should throws an error when entity not found', async () => {
    await expect(() =>
      sut.execute({ id: 'fake', name: 'test name' }),
    ).rejects.toThrow(new NotFoundError('Entity not found'))
  })

  it('Should throws an error when name not provider', async () => {
    await expect(() => sut.execute({ id: 'fake', name: '' })).rejects.toThrow(
      new BadRequestError('Name not provider'),
    )
  })

  it('Should update a user', async () => {
    const spyFindById = jest.spyOn(repository, 'update')
    const items = [new UserEntity(UserDataBuilder({}))]
    repository.items = items

    const result = await sut.execute({ id: items[0].id, name: 'new name' })

    expect(spyFindById).toHaveBeenCalledTimes(1)
    expect(result).toEqual(items[0].toJSON())
    // console.log(result)
  })
})
