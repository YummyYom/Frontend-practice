import { useFormContext } from 'react-hook-form';
import { InputFieldDef } from '../interfaces/FieldDef';
import { GetBaseInputValidation } from './Commons';
import { Box, Flex, FormLabel, Input, Tooltip } from '@chakra-ui/react';

function InputField({ field }: { field: InputFieldDef }) {
  const formMethods = useFormContext();

  return (
    <Flex padding="0.08em" paddingBottom={'0.2em'} paddingRight={'0.3em'}>
      {!field.displayOptions?.noLabel && <FormLabel htmlFor={field.name}>{field.labelName}</FormLabel>}
      <Tooltip label={field.name} placement="bottom-start" openDelay={500}>
        <Input
          aria-label={field.name}
          id={field.name}
          {...formMethods.register(field.name, GetBaseInputValidation(field))}
          //onChange={(event) => handleChange(event.currentTarget.value)}
          type={field.inputSubType ?? 'text'}
          //validators
          maxLength={field.validators?.maxLength}
          min={field.validators?.min}
          max={field.validators?.max}
          //maskcurrency
          //maskdate
          // placeholder={field.name}
          hidden={field.displayOptions?.hidden ?? false}
          readOnly={field.displayOptions?.readOnly ?? false}
          width={field.width ? field.width : '8rem'}
          bg="white"
          //Enforces uppercase on all input fields. TODO: add exception for longform comment text boxes by reading from field def
          textStyle={'uCaseInput'}
          // onInvalid={(e)=>{e.target.setCustomValidity("error invalid")}}
        />
      </Tooltip>
    </Flex>
  );
}

export { InputField };
