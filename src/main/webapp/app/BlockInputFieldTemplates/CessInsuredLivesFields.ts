import { FieldType } from '../interfaces/FieldDef';

export const cdSmoPersonCess = {
  type: FieldType.INPUT,
  name: 'cdSmoPersonCess',
  labelName: 'Smo',
  width: '5em',
  inputSubType: 'string',
} as const;
export const ratingPersonCess = {
  type: FieldType.INPUT,
  name: 'ratingPersonCess',
  labelName: 'Rating',
  width: '5em',
  inputSubType: 'number',
} as const;
export const cdOccPerson = {
  type: FieldType.INPUT,
  name: 'cdOccPerson',
  labelName: 'Occ',
  width: '5em',
  inputSubType: 'string',
} as const;
export const cdClsPersonCess = {
  type: FieldType.INPUT,
  name: 'cdClsPersonCess',
  labelName: 'Risk Cls',
  width: '5em',
  inputSubType: 'string',
} as const;
export const dtInsuredDeath = {
  type: FieldType.INPUT,
  name: 'dtInsuredDeath',
  labelName: 'Dt Ins. Death',
  width: '8em',
  inputSubType: 'date',
} as const;

export const CESS_INSURED_LIVES_FIELDS = {
  cdSmoPersonCess,
  ratingPersonCess,
  cdOccPerson,
  cdClsPersonCess,
  dtInsuredDeath,
};
