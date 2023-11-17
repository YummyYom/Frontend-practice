import { FieldType } from '../interfaces/FieldDef';

export const cdTypFttBen = {
  type: FieldType.INPUT,
  name: 'cdTypFttBen',
  labelName: 'Typ',
  width: '3em',
  inputSubType: 'string',
  displayOption: { noLabel: true },
} as const;
export const noFttBen = {
  type: FieldType.INPUT,
  name: 'noFttBen',
  labelName: 'Fam no',
  width: '6em',
  inputSubType: 'number',
  displayOption: { noLabel: true },
} as const;
export const cdMethFttBen = {
  type: FieldType.INPUT,
  name: 'cdMethFttBen',
  labelName: 'Meth',
  width: '3em',
  inputSubType: 'number',
  displayOption: { noLabel: true },
} as const;
export const methFttArg1 = {
  type: FieldType.INPUT,
  name: 'methFttArg1',
  labelName: 'Arg 1',
  width: '4em',
  inputSubType: 'number',
  displayOption: { noLabel: true },
} as const;
export const methFttArg2 = {
  type: FieldType.INPUT,
  name: 'methFttArg2',
  labelName: 'Arg 2',
  width: '4em',
  inputSubType: 'number',
  displayOption: { noLabel: true },
} as const;
export const methFttArg3 = {
  type: FieldType.INPUT,
  name: 'methFttArg3',
  labelName: 'Arg 3',
  width: '4em',
  inputSubType: 'number',
  displayOption: { noLabel: true },
} as const;
export const methFttArg4 = {
  type: FieldType.INPUT,
  name: 'methFttArg4',
  labelName: 'Arg 4',
  width: '4em',
  inputSubType: 'number',
  displayOption: { noLabel: true },
} as const;
export const methFttArg5 = {
  type: FieldType.INPUT,
  name: 'methFttArg5',
  labelName: 'Arg 5',
  width: '4em',
  inputSubType: 'number',
  displayOption: { noLabel: true },
} as const;
export const dtEffCond = {
  type: FieldType.INPUT,
  name: 'dtEffCond',
  labelName: 'Dt Cond.',
  inputSubType: 'date',
  displayOption: { noLabel: true },
} as const;
export const cdMethodCond = {
  type: FieldType.INPUT,
  name: 'cdMethodCond',
  labelName: 'Meth',
  width: '3em',
  inputSubType: 'string',
  displayOption: { noLabel: true },
} as const;
export const dtEnrgCond = {
  type: FieldType.INPUT,
  name: 'dtEnrgCond',
  labelName: 'Dt Enrg',
  inputSubType: 'date',
  displayOption: { noLabel: true },
} as const;
export const idBen = {
  type: FieldType.INPUT,
  name: 'idBen',
  labelName: 'Id Ben.',
  width: '8em',
  inputSubType: 'number',
  displayOption: { noLabel: true },
} as const;

export const FAM_DEF_FIELDS = {
  cdTypFttBen,
  noFttBen,
  cdMethFttBen,
  cdMethodCond,
  dtEffCond,
  dtEnrgCond,
  idBen,
  methFttArg1,
  methFttArg2,
  methFttArg3,
  methFttArg4,
  methFttArg5,
};
