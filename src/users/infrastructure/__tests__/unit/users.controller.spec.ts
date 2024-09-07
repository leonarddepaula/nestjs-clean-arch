import { UserOutput } from '@/users/application/dtos/user.output.dto'
import { ListUsersUseCase } from '@/users/application/usecases/list-users.usecase'
import { SigninUseCase } from '@/users/application/usecases/signin.usecase'
import { SignupUseCase } from '@/users/application/usecases/signup.usecase'
import { UpdateUserUseCase } from '@/users/application/usecases/upadate-user.usecase'
import { UpdatePasswordUseCase } from '@/users/application/usecases/update-password.usecase'
import { SigninDto } from '../../dtos/signin.dto'
import { SignupDto } from '../../dtos/signup.dto'
import { UpdatePasswordDto } from '../../dtos/update-password.dto'
import { UpdateUserDto } from '../../dtos/update-user.dto'
import { UsersController } from '../../users.controller'

describe('UsersController', () => {
  let sut: UsersController
  let id: string
  let props: UserOutput

  beforeEach(async () => {
    sut = new UsersController()
    id = 'c4e12c0b-60ff-4f0f-a069-042a20b9b4ed'
    props = {
      id,
      email: 'a@a.com',
      name: 'Jhon Doe',
      password: '123456',
      createdAt: new Date(),
    }
  })
  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  it('should create a user', async () => {
    const output: SignupUseCase.Output = props
    const mockSignupUseCase = {
      execute: jest.fn().mockResolvedValue(Promise.resolve(output)),
    }
    sut['signupUseCase'] = mockSignupUseCase as any
    const input: SignupDto = {
      email: 'a@a.com',
      name: 'Jhon Doe',
      password: '123456',
    }

    const result = await sut.create(input)
    expect(output).toMatchObject(result)
    expect(mockSignupUseCase.execute).toHaveBeenCalledWith(input)
  })

  it('should authenticate a user', async () => {
    const output: SigninUseCase.Output = props
    const mockSigninUseCase = {
      execute: jest.fn().mockResolvedValue(Promise.resolve(output)),
    }
    sut['signinUseCase'] = mockSigninUseCase as any
    const input: SigninDto = {
      email: 'a@a.com',
      password: '123456',
    }

    const result = await sut.login(input)
    expect(output).toMatchObject(result)
    expect(mockSigninUseCase.execute).toHaveBeenCalledWith(input)
  })

  it('should upadate a user', async () => {
    const output: UpdateUserUseCase.Output = props
    const mockUpdateUserUseCase = {
      execute: jest.fn().mockResolvedValue(Promise.resolve(output)),
    }
    sut['updateUserUseCase'] = mockUpdateUserUseCase as any
    const input: UpdateUserDto = {
      name: 'Jhon Doe',
    }

    const result = await sut.update(id, input)
    expect(output).toMatchObject(result)
    expect(mockUpdateUserUseCase.execute).toHaveBeenCalledWith({ id, ...input })
  })

  it('should upadate a users password', async () => {
    const output: UpdatePasswordUseCase.Output = props
    const mockUpdatePasswordUseCase = {
      execute: jest.fn().mockResolvedValue(Promise.resolve(output)),
    }
    sut['updatePasswordUseCase'] = mockUpdatePasswordUseCase as any
    const input: UpdatePasswordDto = {
      oldPassword: '123456',
      password: '1234567',
    }

    const result = await sut.updatePassword(id, input)
    expect(output).toMatchObject(result)
    expect(mockUpdatePasswordUseCase.execute).toHaveBeenCalledWith({
      id,
      ...input,
    })
  })

  it('should delte a user', async () => {
    const output = undefined
    const mockDeleteUserUseCase = {
      execute: jest.fn().mockResolvedValue(Promise.resolve(output)),
    }
    sut['deleteUserUseCase'] = mockDeleteUserUseCase as any

    const result = await sut.remove(id)
    expect(output).toStrictEqual(result)
    expect(mockDeleteUserUseCase.execute).toHaveBeenCalledWith({
      id,
    })
  })

  it('should find a user', async () => {
    const output: UserOutput = props
    const mockGetUserUseCase = {
      execute: jest.fn().mockResolvedValue(Promise.resolve(output)),
    }
    sut['getUserUseCase'] = mockGetUserUseCase as any

    const result = await sut.findOne(id)
    expect(output).toMatchObject(result)
    expect(mockGetUserUseCase.execute).toHaveBeenCalledWith({ id })
  })

  it('should list users ', async () => {
    const output: ListUsersUseCase.Output = {
      items: [props],
      currentPage: 1,
      lastPage: 1,
      perPage: 1,
      total: 1,
    }
    const mockListUsersUseCase = {
      execute: jest.fn().mockResolvedValue(Promise.resolve(output)),
    }
    sut['listUsersUseCase'] = mockListUsersUseCase as any
    const searchParams = {
      page: 1,
      perPage: 1,
    }

    const result = await sut.search(searchParams)
    expect(output).toMatchObject(result)
    expect(mockListUsersUseCase.execute).toHaveBeenCalledWith({
      ...searchParams,
    })
  })
})
