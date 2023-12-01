import { Button, Container, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, UseDisclosureReturn } from '@chakra-ui/react';
import TableBlock, { TableProps } from './TableBlock';
import { FieldDef, FieldType, InputFieldDef } from '../interfaces/FieldDef';
import ContainerBlock from './ContainerBlock';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { FieldNameListType } from './Commons';
import { FieldValues } from 'react-hook-form';

interface ModalBaseProps<DataIn, SubmitOut extends FieldValues> extends TableProps<DataIn, SubmitOut> {
  disclosure: UseDisclosureReturn;
  onValuePicked: (ri: SelectedRowInfo<DataIn>) => void;
  onOpen: () => void;
  onClose: () => void;
}

export type SelectedRowInfo<DataIn> = { rowIndex: number; rowData: DataIn };

export function ModalTableBase<I, O extends FieldValues>(props: React.PropsWithChildren<ModalBaseProps<I, O>>) {
  const [selectedRowInfo, setSelectedRowInfo] = useState({} as SelectedRowInfo<I>);

  //console.log('isOpen:' + props.disclosure.isOpen.toString());
  return (
    <Modal
      isOpen={props.disclosure.isOpen}
      onClose={() => {
        props.onClose;
        props.disclosure.onClose();
      }}
      scrollBehavior="inside"
    >
      <ModalContent maxW="70%" borderWidth={'0.2em'} borderColor="blue.500">
        <ModalCloseButton />
        <ModalBody>
          <ContainerBlock name={props.name} contentDisplay="flex">
            <TableBlock<I, O>
              formMethods={props.formMethods}
              fetchedData={props.fetchedData}
              name={props.name}
              fieldDefs={props.fieldDefs}
              keyFieldNames={props.keyFieldNames}
              defaultRowCount={props.defaultRowCount ?? 1}
              onClickRow={(ri: SelectedRowInfo<I>) => {
                setSelectedRowInfo(ri);
                //console.log('row click ' + ri.rowIndex.toString() + ' ' + JSON.stringify(ri.rowData));
              }}
              height={`35em`}
              overflowY="scroll"
            ></TableBlock>
            {props.children}

            <IconButton
              aria-label="Select"
              icon={<CheckIcon />}
              onClick={() => {
                props.onValuePicked(selectedRowInfo);
                props.onClose;
                props.disclosure.onClose();
              }}
            >
              Select
            </IconButton>
          </ContainerBlock>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

const codeDescFieldDefs: InputFieldDef[] = [
  {
    type: FieldType.INPUT,
    name: 'CODE',
    labelName: 'Code',
    inputSubType: 'text',
    width: '18em',
    displayOptions: { readOnly: true, noLabel: true },
  },
  {
    type: FieldType.INPUT,
    name: 'DESCRIPTION',
    labelName: 'Description',
    width: '40em',
    inputSubType: 'text',
    displayOptions: { readOnly: true, noLabel: true },
  },
];

export type ModalCodeDescValues = {
  CODE: string;
  DESCRIPTION: string;
};
export type ModalCodeDescFields = FieldNameListType<typeof codeDescFieldDefs>;

export function ModalTableCodeDesc<I>(
  props: React.PropsWithChildren<Omit<ModalBaseProps<I, ModalCodeDescFields>, 'fieldDefs' | 'keyFieldNames'>>
) {
  return (
    <ModalTableBase<I, ModalCodeDescFields>
      formMethods={props.formMethods}
      name={props.name}
      fieldDefs={codeDescFieldDefs}
      fetchedData={props.fetchedData}
      keyFieldNames={['CODE']}
      disclosure={props.disclosure}
      onOpen={props.onOpen}
      onClose={props.onClose}
      defaultRowCount={props.defaultRowCount}
      onValuePicked={props.onValuePicked}
    >
      {props.children}
    </ModalTableBase>
  );
}

ModalTableCodeDesc.whyDidYouRender = true;
ModalTableBase.whyDidYouRender = true;
