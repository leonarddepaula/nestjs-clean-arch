import { UserDataBuilder } from "@/users/domain/testing/helpers/user-data-builder"
import { UserEntity, UserProps } from "../../user.entity"
import { EntityValidationError } from "@/shared/domain/errors/validation-error"

describe("User Entity Integration Test", () => {

  describe("Contructor method", () => {

    it("Should throw an error when creating a userwith invalid name", () => {
      let props: UserProps = {
        ...UserDataBuilder({}),
        name: null
      }
      expect(() => new UserEntity(props)).toThrowError(EntityValidationError)

      props = {
        ...UserDataBuilder({}),
        name: ""
      }
      expect(() => new UserEntity(props)).toThrowError(EntityValidationError)

      props = {
        ...UserDataBuilder({}),
        name: "a".repeat(256)
      }
      expect(() => new UserEntity(props)).toThrowError(EntityValidationError)

})

})

})
