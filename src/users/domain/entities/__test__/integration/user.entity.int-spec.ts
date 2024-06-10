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

    it('Should throw an error when creating a userwith invalid password', () => {
      let props: UserProps = {
        ...UserDataBuilder({}),
        password: null,
      }
      expect(() => new UserEntity(props)).toThrowError(EntityValidationError)

      props = {
        ...UserDataBuilder({}),
        password: '',
      }
      expect(() => new UserEntity(props)).toThrowError(EntityValidationError)

      props = {
        ...UserDataBuilder({}),
        password: 10 as any,
      }
      expect(() => new UserEntity(props)).toThrowError(EntityValidationError)

      props = {
        ...UserDataBuilder({}),
        password: 'a'.repeat(101),
      }
      expect(() => new UserEntity(props)).toThrowError(EntityValidationError)
    })

    it('Should throw an error when creating a userwith invalid createdAt', () => {
      let props: UserProps = {
        ...UserDataBuilder({}),
        createdAt: '2023' as any,
      }
      expect(() => new UserEntity(props)).toThrowError(EntityValidationError)

      props = {
        ...UserDataBuilder({}),
        createdAt: 10 as any,
      }
      expect(() => new UserEntity(props)).toThrowError(EntityValidationError)
    })

    it('Should a valid user ', () => {
      expect.assertions(0)

      const props: UserProps = {
        ...UserDataBuilder({}),
      }

      new UserEntity(props)
    })
  })

  describe('Updated method', () => {
    it('Should throw an error when upated a user with invalid name', () => {
      const entity = new UserEntity(UserDataBuilder({}))
      expect(() => entity.updated(null)).toThrowError(EntityValidationError)
      expect(() => entity.updated('')).toThrowError(EntityValidationError)
      expect(() => entity.updated(10 as any)).toThrowError(
        EntityValidationError,
      )
      expect(() => entity.updated('a'.repeat(256))).toThrowError(
        EntityValidationError,
      )
    })

    it('Should a valid user ', () => {
      expect.assertions(0)

      const props: UserProps = {
        ...UserDataBuilder({}),
      }

      const entity = new UserEntity(props)
      entity.updated('new name')
    })
  })

  describe('Updated Password method', () => {
    it('Should invalid user using passwordfield', () => {
      const entity = new UserEntity(UserDataBuilder({}))
      expect(() => entity.updatedPassword(null)).toThrowError(
        EntityValidationError,
      )
      expect(() => entity.updatedPassword('')).toThrowError(
        EntityValidationError,
      )
      expect(() => entity.updatedPassword(10 as any)).toThrowError(
        EntityValidationError,
      )
      expect(() => entity.updatedPassword('a'.repeat(101))).toThrowError(
        EntityValidationError,
      )
    })

    it('Should a valid user ', () => {
      expect.assertions(0)

      const props: UserProps = {
        ...UserDataBuilder({}),
      }

      const entity = new UserEntity(props)
      entity.updatedPassword('new password')
    })
  })
})
