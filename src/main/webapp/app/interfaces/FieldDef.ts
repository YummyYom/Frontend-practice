import { FieldValues, UseFormRegister, UseFormReturn, ValidationRule } from 'react-hook-form';

interface InputFieldDef extends BaseFieldDef {
  type: FieldType.INPUT;
  onChangeSub?: (val: number | string | undefined) => void;
  width?: string /**Size was removed in favor of CSS' width as it is better defined */;
  inputSubType: string /**e.g. date, password, button, etc. */;
  validators?: {
    required?: boolean;
    fieldValidation?: object;
    maxLength?: number;
    minLength?: number;
    isInteger?: boolean;
    isNumeric?: boolean;
    min?: number;
    max?: number;
    pattern?: ValidationRule<RegExp> | undefined;
  };
  displayOptions?: {
    sort?: { active: boolean; order: number };
    filter?: object;
    maskCurrency?: boolean;
    maskDate?: boolean;
    hidden?: boolean;
    readOnly?: boolean;
    noLabel?: boolean;
    inlineLabel?: boolean;
    showButton?: boolean;
    textTransform?: string;
  };
}

/**LabelName is used as the text inside the button by default, as well as for the header label if inside a form or table.
 * ButtonText will override the text value on the button but not the header label if supplied.
 */
interface ButtonFieldDef extends BaseFieldDef {
  type: FieldType.BUTTON;
  buttonType?: 'submit' | 'reset' | 'button' | undefined;
  buttonText?: string;
  showLabel?: boolean;
  onClick?: (id: string, event: React.MouseEvent<HTMLButtonElement>, formMethods?: UseFormReturn) => void;
}

interface SelectFieldDef extends BaseFieldDef {
  type: FieldType.SELECT;
  options: { label: string; value: string }[];
}

/**Basic metadata supplied to block components
 */
interface BaseFieldDef {
  name: string /**Unique identifier */;
  labelName: string /**Front-facing description e.g. for labels*/;
  type: FieldType;
  register?: UseFormRegister<FieldValues>;
}

/**All union types must extend BaseFieldDef */
type FieldDef = InputFieldDef | ButtonFieldDef | SelectFieldDef;

enum FieldType {
  INPUT = 'input',
  BUTTON = 'button',
  SELECT = 'select',
}

export { FieldType, FieldDef, InputFieldDef, ButtonFieldDef, BaseFieldDef, SelectFieldDef };
