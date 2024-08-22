import { InvalidPasswordError } from '@/shared/application/errors/invalid-password-error'
import { HashProvider } from '@/shared/application/providers/hash-provider'
import { NotFoundError } from '@/shared/domain/errors/not-found-error'
import { UserEntity } from '@/users/domain/entities/user.entity'
import { UserDataBuilder } from '@/users/domain/testing/helpers/user-data-builder'
import { UserInMemoryRepository } from '@/users/infrastructure/database/in-memory/repositories/user-in-momory.repository'
import { BcryptjsHashProvider } from '@/users/infrastructure/hash-provider/bcryptjs-hash.provider'
import { UpdatePasswordUserUseCase } from '../../update-password.usecase'
describe('UpdatePasswordUserUseCase', () => {
  let sut: UpdatePasswordUserUseCase.UseCase
  let repository: UserInMemoryRepository
  let hashProvider: HashProvider

  beforeEach(() => {
    repository = new UserInMemoryRepository()
    hashProvider = new BcryptjsHashProvider()
    sut = new UpdatePasswordUserUseCase.UseCase(repository, hashProvider)
  })
  it('Should throws an error when entity not found', async () => {
    await expect(() =>
      sut.execute({
        id: 'fake',
        password: 'test password',
        oldPassword: 'old password',
      }),
    ).rejects.toThrow(new NotFoundError('Entity not found'))
  })

  it('Should throws an error when password not provider', async () => {
    const entity = new UserEntity(UserDataBuilder({ password: '1234' }))
    repository.items = [entity]
    await expect(() =>
      sut.execute({
        id: entity._id,
        password: '',
        oldPassword: '1234',
      }),
    ).rejects.toThrow(
      new InvalidPasswordError('Old password and new password are required'),
    )
  })

  it('Should throws an error when Old password does not match', async () => {
    const hashPassword = await hashProvider.generateHash('1234')
    const entity = new UserEntity(UserDataBuilder({ password: hashPassword }))
    repository.items = [entity]
    await expect(() =>
      sut.execute({
        id: entity._id,
        password: '4567',
        oldPassword: '123456',
      }),
    ).rejects.toThrow(new InvalidPasswordError('Old password does not match'))
  })

  it('Should update a password', async () => {
    const hashPassword = await hashProvider.generateHash('1234')
    const spyUpdate = jest.spyOn(repository, 'update')
    const items = [new UserEntity(UserDataBuilder({ password: hashPassword }))]
    repository.items = items

    const result = await sut.execute({
      id: items[0]._id,
      password: '4567',
      oldPassword: '1234',
    })

    const checkNewPassword = await hashProvider.compareHash(
      '4567',
      result.password,
    )

    expect(spyUpdate).toHaveBeenCalledTimes(1)
    expect(checkNewPassword).toBeTruthy()
    // console.log(result)
  })
})
