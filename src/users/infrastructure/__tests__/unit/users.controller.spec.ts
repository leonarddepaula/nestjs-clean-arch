import { UserOutput } from '@/users/application/dtos/user.output.dto'
import { SignupUseCase } from '@/users/application/usecases/signup.usecase'
import { SignupDto } from '../../dtos/signup.dto'
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
  })
})
