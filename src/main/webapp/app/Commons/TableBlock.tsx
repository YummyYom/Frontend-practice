import React, { useEffect } from 'react';
import { BaseFieldDef, FieldDef, FieldType } from '../interfaces/FieldDef';
import { Field } from './Field';
import {
  DeepPartial,
  FieldValue,
  FieldValues,
  FormProvider,
  UseFieldArrayReturn,
  UseFormReturn,
  useFieldArray,
  useForm,
  UseFieldArrayProps,
} from 'react-hook-form';
import { Box, Button, FormControl, ResponsiveValue, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { SelectedRowInfo } from './ModalBase';

export interface TableProps<DataIn, SubmitOut> {
  formMethods: UseFormReturn;
  formFieldArray?: UseFieldArrayReturn;
  fetchedData: DataIn[];
  name: string;
  id?: string;
  fieldDefs: FieldDef[];
  submitQueryCallback?: SubmitOut extends void ? () => void : (submitData: SubmitOut) => void;
  resetCallback?: (blockName: string, isReset: boolean, cascadeStatus?: boolean) => void;
  onClickRow?: (ri: SelectedRowInfo<DataIn>) => void;
  keyFieldNames: string[];
  highlightedRowIds?: number[];
  hideQueryButtons?: boolean;
  forceReadonly?: boolean;
  defaultRowCount?: number;
  height?: string;
  overflowX?: string;
  overflowY?: string;
  margin?: string;
  padding?: string;
}

/**F: Data type you want to supply to the form from a query result,
 * S: What the form returns when submitted, based on {fields}  */
function TableBlock<DataIn, SubmitOut>(props: TableProps<DataIn, SubmitOut>) {
  let defaultFormFieldArray: UseFieldArrayReturn<FieldValues, string, 'id'>;
  if (props.formFieldArray == undefined) {
    defaultFormFieldArray = useFieldArray({
      control: props.formMethods.control,
      name: props.name + 'FieldArray',
      shouldUnregister: true,
    });
  }
  // console.log('Table_Data_Check on ' + props.name + ' with ' + JSON.stringify(props.fetchedData ?? ''));

  //Populate fetched data
  useEffect(() => {
    // console.log('useEffect_Table on ' + props.name);
    // console.log('useEffect_Table_Data on ' + props.name + ' with ' + JSON.stringify(props.fetchedData ?? ''));

    if (props.fetchedData !== undefined && props.fetchedData !== null && props.fetchedData.length > 0) {
      props.formMethods.reset({});
      props.formMethods.unregister();
      (props.formFieldArray ?? defaultFormFieldArray).remove();

      // console.log('has data!');
      props.fetchedData.forEach((dataItem, index) => {
        // console.log('appended!');
        (props.formFieldArray ?? defaultFormFieldArray).append(dataItem);
      });
    }
  }, [props.fetchedData]);

  return (
    <Box className="TableContainer" id={props.id} padding={props.padding} margin={props.margin} width="100%">
      <FormProvider {...props.formMethods}>
        <FormControl>
          <TableContainer
            height={props.height}
            display="grid"
            overflowX={props.overflowX as 'auto' | 'scroll' | undefined}
            overflowY={props.overflowY as 'auto' | 'scroll' | undefined}
          >
            <Table variant="simple" colorScheme="gray" size="sm" id={props.id ?? props.name}>
              <TableHeader fieldDefs={props.fieldDefs} />
              <TableRows
                formMethods={props.formMethods}
                formFieldArray={props.formFieldArray ?? defaultFormFieldArray}
                fieldDefs={props.fieldDefs}
                fetchedData={props.fetchedData}
                name={props.name}
                defaultRowCount={props.defaultRowCount}
                keyFieldNames={props.keyFieldNames}
                highlightedRowIds={props.highlightedRowIds}
                fieldArray={props.formFieldArray ?? defaultFormFieldArray}
                onClickRow={props.onClickRow}
              />
            </Table>
          </TableContainer>
        </FormControl>
      </FormProvider>
    </Box>
  );
}

function TableHeader<FieldDef>(props: { fieldDefs: FieldDef[] }) {
  const headers = props.fieldDefs.map((fieldDef, index) => {
    return <Th key={`Header-${(fieldDef as BaseFieldDef).labelName + index.toString()}`}>{(fieldDef as BaseFieldDef).labelName}</Th>;
  });

  return (
    <Thead position="sticky" top={0} bgColor={'blue.700'} zIndex={1}>
      <Tr>{headers}</Tr>
    </Thead>
  );
}

interface TableRowProps<DataIn, SubmitOut> extends TableProps<DataIn, SubmitOut> {
  fieldArray: UseFieldArrayReturn;
}

function TableRows<DataIn, SubmitOut>(props: TableRowProps<DataIn, SubmitOut>) {
  const rows: JSX.Element[] = [];

  const hasData = (i: number): boolean => props.fetchedData && props.fetchedData.length > i;

  // console.log(`begin filling table layout:${props.name}, hasdata: ${JSON.stringify(props.fetchedData ?? '')}`);
  for (let i = 0; i < (props.fieldArray.fields.length > 0 ? props.fieldArray.fields.length : props.defaultRowCount ?? 1); i++) {
    // console.log(`filling row ${i}, hasData: ${hasData(i)}`);

    const keyIdsConcat = () =>
      props.keyFieldNames.reduce(
        (concat, valName) => concat + '_' + valName + '_' + (props.fetchedData[i][valName as keyof DataIn] as string),
        ''
      );

    rows.push(
      <Tr
        key={`${props.name + 'FieldArray'}_row$${hasData(i) ? keyIdsConcat() : '_' + i.toString()}`}
        onClick={() => {
          console.log('inner row click');
          props.onClickRow?.({
            rowIndex: i,
            rowData: props.fetchedData[i],
          } as SelectedRowInfo<DataIn>);
        }}
        bg={i % 2 ? 'white' : 'gray.100'}
        bgGradient={props.highlightedRowIds?.includes(i) ? 'linear(to-r, blue.400, teal.500)' : ''}
      >
        {props.fieldDefs.map((fieldDef, index2) => {
          // {
          //   props.name.includes('TYP_FTT')
          //     ? console.log(
          //         `${props.name}FieldArray.${i}.cell${
          //           hasData(i) ? keyIdsConcat() + '_' + fieldDef.name : i.toString() + '-' + index2.toString()
          //         }` +
          //           ' ' +
          //           JSON.stringify(props.fetchedData[i])
          //       )
          //     : '';
          // }
          return (
            <Td
              key={`${props.name}FieldArray.${i}.cell${
                hasData(i) ? keyIdsConcat() + '_' + fieldDef.name : i.toString() + '-' + index2.toString()
              }`}
            >
              <Field
                field={{
                  ...fieldDef,
                  name: `${props.name}FieldArray.${i}.${fieldDef.name}`,
                }}
                forceNoLabel={true}
                forceReadonly={props.forceReadonly}
              />
            </Td>
          );
        })}
      </Tr>
    );
  }

  return <Tbody>{rows}</Tbody>;
}

TableBlock.whyDidYouRender = true;
export default TableBlock;
