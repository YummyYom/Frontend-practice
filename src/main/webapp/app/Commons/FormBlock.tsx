import { FieldValues, FormProvider, SubmitHandler, UseFormReturn, useForm } from 'react-hook-form';
import { SylvieKeys } from '../Commons/Commons';
import React, { useEffect } from 'react';
import { FieldDef, FieldType } from '../interfaces/FieldDef';
import { ErrorMessage } from '@hookform/error-message';
import { FormButtons } from './FormButtons';
import { Flex, FormControl } from '@chakra-ui/react';
import { Field } from './Field';
import equal from 'fast-deep-equal';

export interface FormProps<DataIn, SubmitOut> {
  formMethods: UseFormReturn;
  fetchedData?: DataIn;
  name: string;
  id?: string;
  fields: FieldDef[];
  isReset?: boolean;
  submitQueryCallback?: SubmitOut extends void ? () => void : (submitData: SubmitOut) => void;
  resetCallback?: SubmitOut extends void ? () => void : (blockName: string, isReset: boolean, cascadeStatus?: boolean) => void;
  hideQueryButtons?: boolean;
}

function FormBlock<DataIn, SubmitOut extends FieldValues>(props: FormProps<DataIn, SubmitOut>) {
  //Main form hook

  const onReset = () => {
    //console.log('formblock resetting');
    props.resetCallback?.(props.name, true);
  };

  const onSubmit: SubmitHandler<FieldValues> = (submitData: unknown) => {
    //console.log('submitting:');
    //console.log(submitData);
    props.submitQueryCallback?.(submitData as SubmitOut);
  };

  //Populate fetched data
  useEffect(() => {
    //console.log(`useEffectForm ${props.name}, hasdata: ${props.fetchedData != undefined}`);
    if (props.isReset) {
      //console.log(props.name + ' is reset!');
      props.formMethods.reset();
    } else {
      props.fields.forEach(f => {
        if (props.fetchedData) {
          if (f.type == FieldType.INPUT && f.inputSubType == 'date') {
            props.formMethods.setValue(f.name, props.fetchedData[f.name as keyof DataIn]?.toString()?.substring(0, 10));
          } else {
            props.formMethods.setValue(f.name, props.fetchedData[f.name as keyof DataIn]);
          }
        }
      });
    }

    // props.resetCallback?.(props.name,false)
  }, [props.fetchedData]);

  return (
    <>
      {!props.hideQueryButtons ? <FormButtons name={props.name} formMethods={props.formMethods} resetCallback={onReset} /> : ''}

      <FormProvider {...props.formMethods}>
        <FormControl>
          <form
            name={props.name}
            id={props.id ?? props.name}
            onSubmit={props.formMethods.handleSubmit(onSubmit)}
            onKeyDown={e => {
              switch (e.key) {
                case SylvieKeys.Reset:
                  //console.log('reset');
                  break;
                case SylvieKeys.EnterQuery:
                  //console.log('entQ');
                  break;
                case SylvieKeys.ExecQuery:
                  //console.log('execQ');
                  break;
                default:
                //console.log('otherkey');
              }
            }}
          >
            <Flex flexWrap={'wrap'} justifyContent={'right'}>
              {props.fields.map((field, index) => (
                <Field key={index} field={field} />
              ))}
            </Flex>
            <ErrorMessage
              errors={props.formMethods.formState.errors}
              name="allerrors"
              render={({ message }) => <p>{message}</p>}
            ></ErrorMessage>
          </form>
        </FormControl>
      </FormProvider>
    </>
  );
}

FormBlock.whyDidYouRender = true;

export default React.memo(FormBlock) as typeof FormBlock;
