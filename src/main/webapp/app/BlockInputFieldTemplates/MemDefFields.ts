import { FieldType } from '../interfaces/FieldDef';

export const noFtt = {
  type: FieldType.INPUT,
  name: 'noFtt',
  labelName: 'Family Number',
  width: '12em',
  inputSubType: 'number',
  displayOption: { noLabel: true },
} as const;
export const cdGenMtt = {
  type: FieldType.INPUT,
  name: 'cdGenMtt',
  labelName: 'Gen',
  width: '3em',
  inputSubType: 'string',
  displayOption: { noLabel: true },
} as const;
export const cdSmoMtt = {
  type: FieldType.INPUT,
  name: 'cdSmoMtt',
  labelName: 'Smo',
  width: '3em',
  inputSubType: 'string',
  displayOption: { noLabel: true },
} as const;
export const pcMinMortMtt = {
  type: FieldType.INPUT,
  name: 'pcMinMortMtt',
  labelName: '% Min Mort',
  width: '5em',
  inputSubType: 'number',
  displayOption: { noLabel: true },
} as const;
export const pcMaxMortMtt = {
  type: FieldType.INPUT,
  name: 'pcMaxMortMtt',
  labelName: '% Max Mort',
  width: '5em',
  inputSubType: 'number',
  displayOption: { noLabel: true },
} as const;
export const minAmtMtt = {
  type: FieldType.INPUT,
  name: 'minAmtMtt',
  labelName: 'Amt Min',
  width: '8em',
  inputSubType: 'number',
  displayOption: { noLabel: true },
} as const;
export const maxAmtMtt = {
  type: FieldType.INPUT,
  name: 'maxAmtMtt',
  labelName: 'Amt Max',
  width: '8em',
  inputSubType: 'number',
  displayOption: { noLabel: true },
} as const;
export const cdClsMtt = {
  type: FieldType.INPUT,
  name: 'cdClsMtt',
  labelName: 'Risk',
  width: '3em',
  inputSubType: 'string',
  displayOption: { noLabel: true },
} as const;
export const duMinXprMtt = {
  type: FieldType.INPUT,
  name: 'duMinXprMtt',
  labelName: 'Min Xprm Du',
  width: '4em',
  inputSubType: 'number',
  displayOption: { noLabel: true },
} as const;
export const duMaxXprMtt = {
  type: FieldType.INPUT,
  name: 'duMaxXprMtt',
  labelName: 'Max Xprm Du',
  width: '4em',
  inputSubType: 'number',
  displayOption: { noLabel: true },
} as const;
export const pcTecht = {
  type: FieldType.INPUT,
  name: 'pcTecht',
  labelName: '% of Tab',
  width: '8em',
  inputSubType: 'number',
  displayOption: { noLabel: true },
} as const;
export const noTecht = {
  type: FieldType.INPUT,
  name: 'noTecht',
  labelName: 'Table ID',
  width: '12em',
  inputSubType: 'number',
  displayOption: { noLabel: true },
} as const;
export const cdOccMtt = {
  type: FieldType.INPUT,
  name: 'cdOccMtt',
  labelName: 'Occ',
  width: '3em',
  inputSubType: 'string',
  displayOption: { noLabel: true },
} as const;

export const MEMDEF_FIELDS = {
  noFtt,
  cdGenMtt,
  cdSmoMtt,
  pcMinMortMtt,
  pcMaxMortMtt,
  minAmtMtt,
  maxAmtMtt,
  cdClsMtt,
  duMinXprMtt,
  duMaxXprMtt,
  pcTecht,
  noTecht,
  cdOccMtt,
};
