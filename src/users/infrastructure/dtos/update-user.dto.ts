import { UpdateUserUseCase } from '@/users/application/usecases/upadate-user.usecase'

export class UpdateUserDto implements Omit<UpdateUserUseCase.Input, 'id'> {
  name: string
}
