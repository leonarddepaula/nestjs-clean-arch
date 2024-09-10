import { ValidationError } from '@/shared/domain/errors/validation-error'
import { setupPrismaTests } from '@/shared/infrastructure/database/prisma/testing/setu-prisma-tests'
import { UserEntity } from '@/users/domain/entities/user.entity'
import { PrismaClient, User } from '@prisma/client'
import { UserModelMapper } from '../../user-model.mapper'

//npm run test:int -- user-model.mapper

describe('UserModelMapper integration test', () => {
  let prismaService: PrismaClient
  let props: any

  beforeAll(async () => {
    setupPrismaTests()
    prismaService = new PrismaClient()
    await prismaService.$connect()
  })

  beforeEach(async () => {
    await prismaService.user.deleteMany()
    props = {
      id: '8c2aad72-8c2a-462f-93bf-13b3cd14a0cd',
      name: 'John Doe',
      email: 'a@a.com',
      password: 'TestePassword123',
      createdAt: new Date(),
    }
  })

  afterAll(async () => {
    await prismaService.$disconnect()
  })

  it('should throws error when user model is invalid', async () => {
    const model: User = Object.assign(props, { name: null })
    expect(() => UserModelMapper.toEntity(model)).toThrow(ValidationError)
  })

  it('should conver a user model to a user entity', async () => {
    const model: User = await prismaService.user.create({ data: props })
    const sut = UserModelMapper.toEntity(model)
    expect(sut).toBeInstanceOf(UserEntity)
    expect(sut.toJSON()).toStrictEqual(props)
  })
})
