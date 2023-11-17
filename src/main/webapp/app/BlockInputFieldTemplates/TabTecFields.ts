import { FieldType } from '../interfaces/FieldDef';

export const noTecht = {
  type: FieldType.INPUT,
  name: 'noTecht',
  labelName: 'Table Id',
  width: '12em',
  inputSubType: 'number',
  displayOption: { noLabel: true },
} as const;
export const minAgeBandTecht = {
  type: FieldType.INPUT,
  name: 'minAgeBandTecht',
  labelName: 'Min Age',
  width: '3em',
  inputSubType: 'string',
  displayOption: { noLabel: true },
} as const;
export const maxAgeBandTecht = {
  type: FieldType.INPUT,
  name: 'maxAgeBandTecht',
  labelName: 'Max Age',
  width: '3em',
  inputSubType: 'string',
  displayOption: { noLabel: true },
} as const;
export const minPolyrBandTecht = {
  type: FieldType.INPUT,
  name: 'minPolyrBandTecht',
  labelName: 'Min Dur',
  width: '5em',
  inputSubType: 'number',
  displayOption: { noLabel: true },
} as const;
export const maxPolyrBandTecht = {
  type: FieldType.INPUT,
  name: 'maxPolyrBandTecht',
  labelName: 'Max Dur',
  width: '5em',
  inputSubType: 'number',
  displayOption: { noLabel: true },
} as const;
export const valTecht = {
  type: FieldType.INPUT,
  name: 'valTecht',
  labelName: 'Rate',
  width: '5em',
  inputSubType: 'number',
  displayOption: { noLabel: true },
} as const;

export const TABTEC_FIELDS = {
  noTecht,
  minAgeBandTecht,
  maxAgeBandTecht,
  minPolyrBandTecht,
  maxPolyrBandTecht,
  valTecht,
};
