import { useFormContext, UseFormReturn } from 'react-hook-form';
import { ButtonFieldDef, InputFieldDef } from '../interfaces/FieldDef';
import { GetBaseInputValidation } from './Commons';
import { Box, Button } from '@chakra-ui/react';

function ButtonField({ field }: { field: ButtonFieldDef }) {
  const formMethods = useFormContext();

  return (
    <Box>
      {field.showLabel && <label htmlFor={field.name}>{field.labelName}</label>}
      <Button
        name={field.name}
        id={field.name}
        type={field.buttonType ?? 'button'}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => field.onClick?.(field.name, e, formMethods ?? ({} as UseFormReturn))}
        colorScheme="blue"
        size="xs"
        borderRadius="1px"
        height="1.4em"
      >
        {field.buttonText ?? field.labelName}
      </Button>
    </Box>
  );
}

export { ButtonField };
