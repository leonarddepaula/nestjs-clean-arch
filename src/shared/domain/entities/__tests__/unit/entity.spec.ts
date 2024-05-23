import { validate as uuidValidade } from 'uuid'
import { Entity } from '../../entity'
import { en } from '@faker-js/faker'

type StubProps = {
  prop1: string
  prop2: number
}
class StubEntity extends Entity<StubProps> {}
describe('Entity unit tests', () => {
  it('should set props and id', () => {
    const props = { prop1: 'value1', prop2: 15 }
    const entity = new StubEntity(props)

    expect(entity.props).toStrictEqual(props)
    expect(entity._id).not.toBeNull()
    expect(uuidValidade(entity._id)).toBeTruthy()
  })

  it('should accept a valid uuid', () => {
    const props = { prop1: 'value1', prop2: 15 }
    const id = 'bc161faf-5473-4ada-b31e-e0b28b9c99e9'
    const entity = new StubEntity(props, id)

    expect(uuidValidade(entity._id)).toBeTruthy()
    expect(entity._id).toBe(id)
  })

  it('should convert a entity to a Javascript object', () => {
    const props = { prop1: 'value1', prop2: 15 }
    const id = 'bc161faf-5473-4ada-b31e-e0b28b9c99e9'
    const entity = new StubEntity(props, id)

    expect(entity.toJSON()).toStrictEqual({ id, ...props })
  })
})
