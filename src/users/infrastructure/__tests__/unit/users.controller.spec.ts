import { UserOutput } from '@/users/application/dtos/user.output.dto'
import { SigninUseCase } from '@/users/application/usecases/signin.usecase'
import { SignupUseCase } from '@/users/application/usecases/signup.usecase'
import { UpdateUserUseCase } from '@/users/application/usecases/upadate-user.usecase'
import { SigninDto } from '../../dtos/signin.dto'
import { SignupDto } from '../../dtos/signup.dto'
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
})
