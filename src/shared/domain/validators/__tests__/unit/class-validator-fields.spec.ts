import { ClassValidatorFields } from '../../class-validator-fields'
import * as libClassValidator from 'class-validator'

class StubClassValidatorFields extends ClassValidatorFields<{
  field: string
}> {}

describe('ClassValidatorFields unit tests', () => {
  it('Should initialize erros and validatedData variables with null', () => {
    const sut = new StubClassValidatorFields()

    expect(sut.erros).toBeNull()
    expect(sut.validatedData).toBeNull()
  })

  it('Should validate with errors', () => {
    const spyValidateSync = jest.spyOn(libClassValidator, 'validateSync')
    spyValidateSync.mockReturnValue([
      { property: 'field', constraints: { isRequired: 'test error' } },
    ])
    const sut = new StubClassValidatorFields()

    expect(sut.validate(null)).toBeFalsy()
    expect(spyValidateSync).toHaveBeenCalled()
    expect(sut.validatedData).toBeNull()
    expect(sut.erros).toEqual({ field: ['test error'] })
  })

  it('Should validate without errors', () => {
    const spyValidateSync = jest.spyOn(libClassValidator, 'validateSync')
    spyValidateSync.mockReturnValue([])
    const sut = new StubClassValidatorFields()

    expect(sut.validate({ field: 'test' })).toBeTruthy()
    expect(spyValidateSync).toHaveBeenCalled()
    expect(sut.validatedData).toEqual({ field: 'test' })
    expect(sut.erros).toBeNull()
  })
})
