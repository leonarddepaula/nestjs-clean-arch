import { Module } from '@nestjs/common'
import { SignupUseCase } from '../application/usecases/signup.usecase'
import { UserInMemoryRepository } from './database/in-memory/repositories/user-in-momory.repository'
import { BcryptjsHashProvider } from './hash-provider/bcryptjs-hash.provider'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: 'UserRepository',
      useClass: UserInMemoryRepository,
    },
    {
      provide: 'HashProvider',
      useValue: BcryptjsHashProvider,
    },
    {
      provide: SignupUseCase.UseCase,
      useClass: SignupUseCase.UseCase,
    },
  ],
})
export class UsersModule {}
