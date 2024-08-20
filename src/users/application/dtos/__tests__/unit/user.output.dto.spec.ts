import { UserEntity } from '@/users/domain/entities/user.entity'
import { UserDataBuilder } from '@/users/domain/testing/helpers/user-data-builder'
import { UserOutputMapper } from '../../user.output.dto'

describe('UserOutpuMapper unit tests', () => {
  it('should converter a user in output', () => {
    const entity = new UserEntity(UserDataBuilder({}))
    const spyToJson = jest.spyOn(entity, 'toJSON')
    const sut = UserOutputMapper.toOutput(entity)

    expect(spyToJson).toHaveBeenCalledTimes(1)
    expect(sut).toStrictEqual(entity.toJSON())
  })
})
