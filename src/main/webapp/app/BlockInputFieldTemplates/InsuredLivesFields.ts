import { FieldType } from '../interfaces/FieldDef';

export const idPerson = {
  type: FieldType.INPUT,
  name: 'idPerson',
  labelName: 'Id Person',
  width: '8em',
  inputSubType: 'number',
} as const;
export const nmBirth = {
  type: FieldType.INPUT,
  name: 'nmBirth',
  labelName: 'Nm Birth',
  width: '12em',
  inputSubType: 'string',
} as const;
export const nm_1stUsual = {
  type: FieldType.INPUT,
  name: 'nm_1stUsual',
  labelName: 'Nm 1St Usual',
  width: '12em',
  inputSubType: 'string',
} as const;
export const dtBirth = {
  type: FieldType.INPUT,
  name: 'dtBirth',
  labelName: 'Dt Birth',
  width: '10em',
  inputSubType: 'date',
} as const;
export const cdGenPerson = {
  type: FieldType.INPUT,
  name: 'cdGenPerson',
  labelName: 'Gen',
  width: '3em',
  inputSubType: 'string',
} as const;
export const nm_1stOther = {
  type: FieldType.INPUT,
  name: 'nm_1stOther',
  labelName: 'Nm 1St Other',
  width: '12em',
  inputSubType: 'string',
} as const;
export const nmMarital = {
  type: FieldType.INPUT,
  name: 'nmMarital',
  labelName: 'Nm Marital',
  width: '12em',
  inputSubType: 'string',
} as const;
export const cdTerrBirth = {
  type: FieldType.INPUT,
  name: 'cdTerrBirth',
  labelName: 'Cd Terr Birth',
  width: '3em',
  inputSubType: 'string',
} as const;
export const placeBirth = {
  type: FieldType.INPUT,
  name: 'placeBirth',
  labelName: 'Place Birth',
  width: '3em',
  inputSubType: 'string',
} as const;
export const init1 = {
  type: FieldType.INPUT,
  name: 'init1',
  labelName: 'Init1',
  width: '2em',
  inputSubType: 'string',
} as const;
export const init2 = {
  type: FieldType.INPUT,
  name: 'init2',
  labelName: 'Init2',
  width: '2em',
  inputSubType: 'string',
} as const;
export const init3 = {
  type: FieldType.INPUT,
  name: 'init3',
  labelName: 'Init3',
  width: '2em',
  inputSubType: 'string',
} as const;
export const init4 = {
  type: FieldType.INPUT,
  name: 'init4',
  labelName: 'Init4',
  width: '2em',
  inputSubType: 'string',
} as const;
export const fictiveLife = {
  type: FieldType.INPUT,
  name: 'fictiveLife',
  labelName: 'Fictive Life',
  width: '2em',
  inputSubType: 'string',
} as const;
export const dtCreated = {
  type: FieldType.INPUT,
  name: 'dtCreated',
  labelName: 'Dt Created',
  width: '12em',
  inputSubType: 'date',
} as const;
export const dtDepersonalize = {
  type: FieldType.INPUT,
  name: 'dtDepersonalize',
  labelName: 'Dt Depersonalize',
  width: '12em',
  inputSubType: 'date',
} as const;

export const INSURED_LIVES_FIELDS = {
  idPerson,
  nmBirth,
  nm_1stUsual,
  dtBirth,
  cdGenPerson,
  nm_1stOther,
  nmMarital,
  cdTerrBirth,
  placeBirth,
  init1,
  init2,
  init3,
  init4,
  fictiveLife,
  dtCreated,
  dtDepersonalize,
};
