import { FieldType, InputFieldDef } from '../interfaces/FieldDef';

export const seqSchedBenDu = {
  type: FieldType.INPUT,
  name: 'seqSchedBenDu',
  labelName: 'Durée',
  width: '2.5rem',
  inputSubType: 'number',
  displayOption: { readonly: true, noLabel: true },
  validators: { required: true, isInteger: true },
} as const;
export const seqSchedBenPer = {
  type: FieldType.INPUT,
  name: 'seqSchedBenPer',
  labelName: 'Per',
  width: '2.5rem',
  inputSubType: 'number',
  displayOption: { readonly: false, noLabel: true },
  validators: {
    required: true,
    ////fieldValidation: ScheduleValidationService.validateSchedulePeriod,
  } as const,
} as const;
export const amtSchedBen = {
  type: FieldType.INPUT,
  name: 'amtSchedBen',
  labelName: 'Mnt.',
  width: '8.5rem',
  inputSubType: 'number',
  displayOption: { maskCurrency: true, noLabel: true },
  validators: {
    required: true,
    //fieldValidation: ValidationService.validateNumericField,
  } as const,
} as const;
export const prmSchedBen = {
  type: FieldType.INPUT,
  name: 'prmSchedBen',
  labelName: 'Primes',
  inputSubType: 'number',
  displayOption: { maskCurrency: true, noLabel: true },
  width: '8.5rem',
  validators: {
    //fieldValidation: ValidationService.validateNumericField
  } as const,
} as const;
export const comSchedBen = {
  type: FieldType.INPUT,
  name: 'comSchedBen',
  labelName: 'Commissions',
  inputSubType: 'number',
  displayOption: { maskCurrency: true, noLabel: true },
  width: '8.5rem',
  validators: {
    //fieldValidation: ValidationService.validateNumericField
  } as const,
} as const;
export const xprSchedBen = {
  type: FieldType.INPUT,
  name: 'xprSchedBen',
  labelName: 'Extra-Prm',
  inputSubType: 'number',
  displayOption: { maskCurrency: true, noLabel: true },
  width: '8.5rem',
  validators: {
    //fieldValidation: ValidationService.validateNumericField
  } as const,
} as const;
export const xcmSchedBen = {
  type: FieldType.INPUT,
  name: 'xcmSchedBen',
  labelName: 'Extra-Com',
  inputSubType: 'number',
  displayOption: { maskCurrency: true, noLabel: true },
  width: '8.5rem',
  validators: {
    //fieldValidation: ValidationService.validateNumericField
  } as const,
} as const;
export const pfSchedBen = {
  type: FieldType.INPUT,
  name: 'pfSchedBen',
  labelName: 'Pol Fee',
  inputSubType: 'number',
  displayOption: { maskCurrency: true, noLabel: true },
  width: '8.5rem',
  validators: {
    //fieldValidation: ValidationService.validateNumericField
  } as const,
} as const;
export const bnsSchedBen = {
  type: FieldType.INPUT,
  name: 'bnsSchedBen',
  labelName: 'Bonus',
  width: '8.5rem',
  inputSubType: 'number',
  displayOption: { maskCurrency: true, noLabel: true },
  validators: {
    //fieldValidation: ValidationService.validateNumericField
  } as const,
} as const;
export const lavSchedBen = {
  type: FieldType.INPUT,
  name: 'lavSchedBen',
  labelName: 'Lap-Ac-Value',
  width: '8.5rem',
  inputSubType: 'number',
  displayOption: { maskCurrency: true, noLabel: true },
  validators: {
    //fieldValidation: ValidationService.validateNumericField
  } as const,
} as const;
export const ex1SchedBen = {
  type: FieldType.INPUT,
  name: 'ex1SchedBen',
  labelName: 'Exp 1',
  width: '8.5rem',
  inputSubType: 'number',
  displayOption: { maskCurrency: true, noLabel: true },
  validators: {
    //fieldValidation: ValidationService.validateNumericField
  } as const,
} as const;
export const ex2SchedBen = {
  type: FieldType.INPUT,
  name: 'ex2SchedBen',
  labelName: 'Exp 2',
  width: '8.5rem',
  inputSubType: 'number',
  displayOption: { maskCurrency: true, noLabel: true },
  validators: {
    //fieldValidation: ValidationService.validateNumericField
  } as const,
} as const;
export const ex3SchedBen = {
  type: FieldType.INPUT,
  name: 'ex3SchedBen',
  labelName: 'Exp 3',
  width: '8.5rem',
  inputSubType: 'number',
  displayOption: { maskCurrency: true, noLabel: true },
  validators: {
    //fieldValidation: ValidationService.validateNumericField
  } as const,
} as const;
export const estRealFlg = {
  type: FieldType.INPUT,
  name: 'estRealFlg',
  labelName: 'Real Flg',
  width: '3rem',
  inputSubType: 'text',
  displayOption: { readonly: true, noLabel: true },
} as const;
export const cbSchUpdTs = {
  type: FieldType.INPUT,
  name: 'cbSchUpdTs',
  labelName: 'Schedule Upd Date',
  width: '8.5rem',
  inputSubType: 'date',
  displayOption: { readonly: true, noLabel: true },
} as const;

export const CESS_BEN_SEQ_SCHEDULE_FIELDS = {
  amtSchedBen,
  bnsSchedBen,
  cbSchUpdTs,
  comSchedBen,
  estRealFlg,
  ex1SchedBen,
  ex2SchedBen,
  ex3SchedBen,
  lavSchedBen,
  pfSchedBen,
  prmSchedBen,
  seqSchedBenDu,
  seqSchedBenPer,
  xcmSchedBen,
  xprSchedBen,
};
