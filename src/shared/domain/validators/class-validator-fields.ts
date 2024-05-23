import { validateSync } from 'class-validator';
import { FieldsErrors, ValidatorFieldsInterface } from './validator-fields.interface'

export abstract class ClassValidatorFields<PropsValidated>
  implements ValidatorFieldsInterface<PropsValidated>
{
  erros: FieldsErrors = null;
  validatedData: PropsValidated = null;
  validate(date: any): boolean {
    const erros = validateSync(date);
    if (erros.length) {
      this.erros = {};
      for (const error of erros){
        const field = error.property;
        this.erros[field] = Object.values(error.constraints);
      }
    }else{
      this.validatedData = date;
    }
    return !erros.length;
  }
}
