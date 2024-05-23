import { UserEntity, UserProps } from '../../user.entity'
import { UserDataBuilder } from '@/users/domain/testing/helpers/user-data-builder';


describe('UserEntity unit tests', () => {
  let props: UserProps
  let sut: UserEntity

  beforeEach(() => {
    props = UserDataBuilder({})
     sut = new UserEntity(props)
  })
  it('Constructor method', () => {
    expect(sut.props.name).toEqual(props.name)
    expect(sut.props.email).toEqual(props.email)
    expect(sut.props.password).toEqual(props.password)
    expect(sut.props.createAt).toBeInstanceOf(Date)
  })

  it('Getter of name field', () => {
    expect(sut.props.name).toBeDefined()
    expect(sut.props.name).toEqual(props.name)
    expect(typeof sut.props.name).toBe('string')
  })

  it('Setter of name field', () => {
    sut['name'] = 'new name'
    expect(sut.props.name).toEqual('new name')
    expect(typeof sut.props.name).toBe('string')
  })

  it('Getter of email field', () => {
    expect(sut.props.email).toBeDefined()
    expect(sut.props.email).toEqual(props.email)
    expect(typeof sut.props.email).toBe('string')
  })

  it('Getter of password field', () => {
    expect(sut.props.password).toBeDefined()
    expect(sut.props.password).toEqual(props.password)
    expect(typeof sut.props.password).toBe('string')
  })

  it('Setter of password field', () => {
    sut['password'] = 'new password'
    expect(sut.props.password).toEqual('new password')
    expect(typeof sut.props.password).toBe('string')
  })
  it('Getter of createAt field', () => {
    expect(sut.props.createAt).toBeDefined()
    expect(sut.props.createAt).toBeInstanceOf(Date)
  })

  it('Should updated a user', () => {
    sut.updated('new name')
    expect(sut.props.name).toEqual('new name')
  })

  it('Should updated a password', () => {
    sut.updatedPassword('new password')
    expect(sut.props.password).toEqual('new password')
  })
})
