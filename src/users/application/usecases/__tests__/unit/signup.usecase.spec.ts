import { BadRequestError } from '@/shared/application/errors/bad-request-error'
import { HashProvider } from '@/shared/application/providers/hash-provider'
import { ConflictError } from '@/shared/domain/errors/conflict-error'
import { UserDataBuilder } from '@/users/domain/testing/helpers/user-data-builder'
import { UserInMemoryRepository } from '@/users/infrastructure/database/in-memory/repositories/user-in-momory.repository'
import { BcryptjsHashProvider } from '@/users/infrastructure/hash-provider/bcryptjs-hash.provider'
import { SignupUseCase } from '../../signup.usecase'
describe('SignupUsecase', () => {
  let sut: SignupUseCase.UseCase
  let repository: UserInMemoryRepository
  let hashProvider: HashProvider

  beforeEach(() => {
    repository = new UserInMemoryRepository()
    hashProvider = new BcryptjsHashProvider()
    sut = new SignupUseCase.UseCase(repository, hashProvider)
  })
  it('Should create a new user', async () => {
    const spyInsert = jest.spyOn(repository, 'insert')
    const props = UserDataBuilder({})
    const result = await sut.execute({
      name: props.name,
      email: props.email,
      password: props.password,
    })
    expect(result.id).toBeDefined()
    expect(result.createdAt).toBeInstanceOf(Date)
    expect(spyInsert).toHaveBeenCalledTimes(1)
  })

  it('Should not be able to register with same email twice', async () => {
    const props = UserDataBuilder({ email: 'a@a.com' })
    await sut.execute(props)

    await expect(() => sut.execute(props)).rejects.toBeInstanceOf(ConflictError)
  })

  it('Should throws error when name not provided', async () => {
    const props = Object.assign(UserDataBuilder({}), { name: null })
    await expect(() => sut.execute(props)).rejects.toBeInstanceOf(
      BadRequestError,
    )
  })

  it('Should throws error when email not provided', async () => {
    const props = Object.assign(UserDataBuilder({}), { email: null })
    await expect(() => sut.execute(props)).rejects.toBeInstanceOf(
      BadRequestError,
    )
  })

  it('Should throws error when password not provided', async () => {
    const props = Object.assign(UserDataBuilder({}), { password: null })
    await expect(() => sut.execute(props)).rejects.toBeInstanceOf(
      BadRequestError,
    )
  })
})
