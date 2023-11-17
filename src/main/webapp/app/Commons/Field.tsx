import { FieldDef, FieldType } from '../interfaces/FieldDef';
import { ButtonField } from './ButtonField';
import { InputField } from './InputField';
import { UseFormRegisterReturn } from 'react-hook-form';

interface FieldProps {
  field: FieldDef;
  key?: number;
  forceNoLabel?: boolean;
  forceReadonly?: boolean;
}

const Field = (props: FieldProps) => {
  switch (props.field.type) {
    case FieldType.INPUT:
      return (
        <InputField
          field={{
            ...props.field,
            displayOptions: {
              ...props.field.displayOptions,
              noLabel: props.forceNoLabel ?? props.field.displayOptions?.noLabel,
              readOnly: props.forceReadonly ?? props.field.displayOptions?.readOnly,
            },
          }}
        />
      );
    case FieldType.BUTTON:
      return <ButtonField field={props.field} />;
    default:
      throw new Error('Invalid field def');
  }
};

Field.whyDidYouRender = true;
export { Field };
