import { RegisterOptions, ValidationRule } from 'react-hook-form';
import { FieldDef, InputFieldDef } from '../interfaces/FieldDef';

/**Replicate Sylvie's block field accessing structure */
function GetField(fieldCollection: InputFieldDef[], name: string): InputFieldDef {
  const found: FieldDef = fieldCollection.find(f => f.name === name)!;
  if (found === null) {
    throw new Error('InputField with dataName ' + name + ' not found.');
  } else {
    return found;
  }
}

//Keycodes:  F1=112, F11=122, F12=123
//TODO: For eventual keyboard based navigation (requires Electron implementation?)
enum SylvieKeys {
  'Reset' = 'F1',
  'EnterQuery' = 'F11',
  'ExecQuery' = 'F12',
  /*TODO: page up/down, arrows, tab*/
}

//create a type with properties corresponding to the extraction of all 'name' values from a given collection of FieldDef/InputType
//e.g. const myFormFields = [{name:'no_pol'},{name:'ext_no_pol'}] will become
//type myFormType = {no_pol:string,ext_no_pol:string}, used for the typing of the react-hook-form registers
export type FieldNameListType<InputType extends FieldDef[]> = {
  [K in InputType[number]['name']]: string;
};

const sylvieDateFormat = (date: Date) => {
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
};

function GetBaseInputValidation(field: InputFieldDef): RegisterOptions {
  //Basic Validation defs
  return {
    required: {
      value: field.validators?.required,
      message: 'Field is required',
    } as ValidationRule<boolean>,
    minLength: {
      value: field.validators?.minLength,
      message: `Value must be ${
        field.validators?.minLength == undefined ? 'longer' : 'at least' + field.validators?.minLength.toString() + ' characters long'
      }`,
    } as ValidationRule<number>,
    maxLength: {
      value: field.validators?.maxLength,
      message: `Value must be ${
        field.validators?.maxLength == undefined ? 'shorter' : 'less than' + field.validators?.maxLength.toString() + ' characters long'
      }`,
    } as ValidationRule<number>,
    min: {
      value: field.validators?.min,
      message: `Value must be ${field.validators?.min == undefined ? 'higher' : 'at least' + field.validators?.min.toString()}`,
    } as ValidationRule<number>,
    max: {
      value: field.validators?.max,
      message: `Value must be ${field.validators?.max == undefined ? 'smaller' : 'less than' + field.validators?.max.toString()}`,
    } as ValidationRule<number>,
    pattern: {
      value: field.validators?.pattern,
      message: `Value must follow pattern ${field.validators?.pattern == undefined ? '' : field.validators?.pattern.toString()}`,
    } as ValidationRule<RegExp>,
  };
}

const extractIndexFromFieldName = (nameToFormat: string) => {
  const match = nameToFormat.match(/\.\d\./);
  if (match) {
    //console.log('extract index:' + match[0].substring(1, 2));
    return Number(match[0].substring(1, 2));
  } else {
    throw new Error('Supplied name id did not contain a row index with format /.d./');
  }
};

export { GetField, SylvieKeys, GetBaseInputValidation, sylvieDateFormat, extractIndexFromFieldName };
