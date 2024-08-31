import { HashProvider } from '@/shared/application/providers/hash-provider'
import { Module } from '@nestjs/common'
import { SignupUseCase } from '../application/usecases/signup.usecase'
import { UserRepository } from '../domain/repositories/user.repository'
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
      useFactory: (
        userRepository: UserRepository.Repository,
        hashProvider: HashProvider,
      ) => {
        return new SignupUseCase.UseCase(userRepository, hashProvider)
      },
      inject: ['UserRepository', 'HashProvider'],
    },
  ],
})
export class UsersModule {}
