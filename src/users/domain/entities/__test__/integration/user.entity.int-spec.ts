import { UserDataBuilder } from '@/users/domain/testing/helpers/user-data-builder'
import { UserEntity, UserProps } from '../../user.entity'
import { EntityValidationError } from '@/shared/domain/errors/validation-error'

describe('User Entity Integration Test', () => {
  describe('Contructor method', () => {
    it('Should throw an error when creating a userwith invalid name', () => {
      let props: UserProps = {
        ...UserDataBuilder({}),
        name: null,
      }
      expect(() => new UserEntity(props)).toThrowError(EntityValidationError)

      props = {
        ...UserDataBuilder({}),
        name: '',
      }
      expect(() => new UserEntity(props)).toThrowError(EntityValidationError)

      props = {
        ...UserDataBuilder({}),
        name: 10 as any,
      }
      expect(() => new UserEntity(props)).toThrowError(EntityValidationError)

      props = {
        ...UserDataBuilder({}),
        name: 'a'.repeat(256),
      }
      expect(() => new UserEntity(props)).toThrowError(EntityValidationError)
    })

    it('Should throw an error when creating a userwith invalid email', () => {
      let props: UserProps = {
        ...UserDataBuilder({}),
        email: null,
      }
      expect(() => new UserEntity(props)).toThrowError(EntityValidationError)

      props = {
        ...UserDataBuilder({}),
        email: '',
      }
      expect(() => new UserEntity(props)).toThrowError(EntityValidationError)

      props = {
        ...UserDataBuilder({}),
        email: 10 as any,
      }
      expect(() => new UserEntity(props)).toThrowError(EntityValidationError)

      props = {
        ...UserDataBuilder({}),
        email: 'a'.repeat(256),
      }
      expect(() => new UserEntity(props)).toThrowError(EntityValidationError)
    })
  })
})
