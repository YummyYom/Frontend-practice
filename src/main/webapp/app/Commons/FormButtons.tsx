import { CheckIcon, CloseIcon, DeleteIcon, SearchIcon, SmallCloseIcon } from '@chakra-ui/icons';
import { Box, Flex, IconButton } from '@chakra-ui/react';
import { FieldValues, UseFormReturn } from 'react-hook-form';

interface ButtonProps<S extends FieldValues> {
  name: string;
  formMethods: UseFormReturn<S>;
  resetCallback?: (blockName: string, isReset: boolean) => void;
}

export function FormButtons<S extends FieldValues>(props: ButtonProps<S>) {
  return (
    <Flex className="DefaultFormButtons" justifyContent={'right'} margin={'0.3em'}>
      <IconButton
        margin={'0.1em'}
        height={'1.5em'}
        aria-label="Enter Query"
        icon={<SmallCloseIcon />}
        colorScheme="blue"
        form={props.name}
        type="button"
        name="EnterQueryBtn"
        onClick={
          () => {
            props.resetCallback?.(props.name, true);
          } //set query mode which modifies onSubmit actions
        }
        disabled={false}
      ></IconButton>
      <IconButton
        margin={'0.1em'}
        height={'1.5em'}
        aria-label="Execute Query"
        icon={<CheckIcon />}
        colorScheme="green"
        form={props.name}
        type="submit"
        name="ExecuteQueryBtn"
        disabled={false}
      ></IconButton>
    </Flex>
  );
}
