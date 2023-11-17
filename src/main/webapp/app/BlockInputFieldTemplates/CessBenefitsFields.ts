import { FieldType, InputFieldDef } from '../interfaces/FieldDef';

export const benefitNumber = {
  type: FieldType.INPUT,
  name: 'benefitNumber',
  labelName: 'No',
  width: '3rem',
  inputSubType: 'number',
  validators: { required: false, min: 1, max: 9 },
  displayOption: { sort: { active: true, order: -1 } },
} as const;
export const cdBenCess = {
  type: FieldType.INPUT,
  name: 'cdBenCess',
  labelName: 'Ben',
  width: '5rem',
  inputSubType: 'text',
  validators: { required: false, maxLength: 3 },
} as const;
export const modRegBenCess = {
  type: FieldType.INPUT,
  name: 'modRegBenCess',
  labelName: 'Mode',
  width: '4rem',
  inputSubType: 'text',
  validators: { maxLength: 3 },
} as const;
export const stBenCess = {
  type: FieldType.INPUT,
  name: 'stBenCess',
  labelName: 'Statut',
  width: '6rem',
  inputSubType: 'text',
  validators: { maxLength: 3 },
} as const;
export const dtStBenCess = {
  type: FieldType.INPUT,
  name: 'dtStBenCess',
  labelName: 'Statut Dt',
  width: '10rem',
  inputSubType: 'date',
} as const;
export const noTrtBenCess = {
  type: FieldType.INPUT,
  name: 'noTrtBenCess',
  labelName: 'Traité',
  width: '6rem',
  inputSubType: 'number',
  validators: { min: 0, max: 999999 } /* , validators: { required: true } */,
  displayOption: { showButton: true },
} as const;
export const noTrtAddBenCess = {
  type: FieldType.INPUT,
  name: 'noTrtAddBenCess',
  labelName: 'Add.',
  width: '3rem',
  inputSubType: 'number',
  validators: { min: 0, max: 3 } /* , validators: { required: true } */,
  displayOption: { showButton: true },
} as const;
export const amtFaceBenCess = {
  type: FieldType.INPUT,
  name: 'amtFaceBenCess',
  labelName: 'Mnt. Nominal',
  width: '10rem',
  inputSubType: 'number',
  displayOption: { maskCurrency: true },
  validators: { required: false },
} as const;
export const amtReinBenCess = {
  type: FieldType.INPUT,
  name: 'amtReinBenCess',
  labelName: 'Mnt. Réassuré',
  width: '10rem',
  inputSubType: 'number',
  displayOption: { maskCurrency: true },
  validators: { required: false },
} as const;
export const amtPrevRetBenCess = {
  type: FieldType.INPUT,
  name: 'amtPrevRetBenCess',
  labelName: 'Mnt. Ret. Préc.',
  width: '10rem',
  inputSubType: 'number',
  displayOption: { maskCurrency: true },
  validators: { required: false },
} as const;
export const vUltimateAmtBenCess = {
  type: FieldType.INPUT,
  name: 'vUltimateAmtBenCess',
  labelName: 'Mnt. Ultime',
  width: '9rem',
  inputSubType: 'number',
  displayOption: { readonly: true, maskCurrency: true },
} as const;
export const noBenCumulIn = {
  type: FieldType.INPUT,
  name: 'noBenCumulIn',
  labelName: 'Cumulé Avec',
  width: '5rem',
  inputSubType: 'number',
  validators: { min: 1, max: 999999 },
} as const;
export const agePricedBenCess = {
  type: FieldType.INPUT,
  name: 'agePricedBenCess',
  labelName: 'Âge',
  width: '3rem',
  inputSubType: 'number',
  validators: { required: false, min: 0, max: 999 },
} as const;
export const duPricedBenCess = {
  type: FieldType.INPUT,
  name: 'duPricedBenCess',
  labelName: 'Durée',
  width: '3rem',
  inputSubType: 'number',
  validators: { min: 0, max: 999 },
} as const;
export const cdGenPricedBenCess = {
  type: FieldType.INPUT,
  name: 'cdGenPricedBenCess',
  labelName: 'Genre',
  width: '3rem',
  inputSubType: 'text',
  validators: {
    required: false,
    //fieldValidation: ValidationService.validateGender,
    maxLength: 2,
  },
  displayOption: { showButton: true },
} as const;
export const cdSmoPricedBenCess = {
  type: FieldType.INPUT,
  name: 'cdSmoPricedBenCess',
  labelName: 'FU',
  width: '3rem',
  inputSubType: 'text',
  validators: {
    //fieldValidation: ValidationService.validateSmoker,
    maxLength: 2,
  },
  displayOption: { showButton: true, textTransform: 'uppercase' },
} as const;
export const cdClsPricedBenCess = {
  type: FieldType.INPUT,
  name: 'cdClsPricedBenCess',
  labelName: 'Risk Cl.',
  width: '3rem',
  inputSubType: 'text',
  validators: { maxLength: 2 },
} as const;
export const pcRatingBenCess = {
  type: FieldType.INPUT,
  name: 'pcRatingBenCess',
  labelName: 'SurM',
  width: '4rem',
  inputSubType: 'number',
  validators: { min: 0, max: 9999 },
} as const;
export const cdExtraRatingBenCess = {
  type: FieldType.INPUT,
  name: 'cdExtraRatingBenCess',
  labelName: 'Extra',
  width: '4rem',
  inputSubType: 'text',
  validators: { maxLength: 1 },
  displayOption: { readonly: true },
} as const;
export const idPlan = {
  type: FieldType.INPUT,
  name: 'idPlan',
  labelName: 'ID Plan',
  inputSubType: 'text',
} as const;
export const idBenPlan = {
  type: FieldType.INPUT,
  name: 'idBenPlan',
  labelName: 'ID Ben Plan',
  inputSubType: 'text',
} as const;
export const idPerson1BenCess = {
  type: FieldType.INPUT,
  name: 'idPerson1BenCess',
  labelName: 'ID 1',
  inputSubType: 'number',
  validators: { required: false, min: 0, max: 9999999 },
} as const;
export const dtAnnBen = {
  type: FieldType.INPUT,
  name: 'dtAnnBen',
  labelName: 'Ann Dt Ben',
  inputSubType: 'date',
} as const;
export const amtFaceBenPrmCal = {
  type: FieldType.INPUT,
  name: 'amtFaceBenPrmCal',
  labelName: 'CU Nom.',
  inputSubType: 'text',
  width: '10rem',
  displayOption: { maskCurrency: true },
} as const;
export const cdTypDis = {
  type: FieldType.INPUT,
  name: 'cdTypDis',
  labelName: 'Type DI.',
  width: '2rem',
  inputSubType: 'text',
  validators: { maxLength: 3 },
} as const;
export const idPerson2BenCess = {
  type: FieldType.INPUT,
  name: 'idPerson2BenCess',
  labelName: 'ID 2',
  inputSubType: 'number',
  validators: { min: 0, max: 9999999 },
} as const;
export const dtBenCess = {
  type: FieldType.INPUT,
  name: 'dtBenCess',
  labelName: 'Dt. Effective',
  inputSubType: 'date',
} as const;
export const amtReinBenPrmCal = {
  type: FieldType.INPUT,
  name: 'amtReinBenPrmCal',
  labelName: 'CU Réass.',
  inputSubType: 'number',
  width: '10rem',
} as const;
export const cdOccPricedBenCess = {
  type: FieldType.INPUT,
  name: 'cdOccPricedBenCess',
  labelName: 'Occupation',
  inputSubType: 'text',
  width: '2em',
  validators: { maxLength: 3 },
} as const;
export const dtBenCessOrig = {
  type: FieldType.INPUT,
  name: 'dtBenCessOrig',
  labelName: 'Dt Ben Ori.',
  inputSubType: 'date',
} as const;
export const idPerson3BenCess = {
  type: FieldType.INPUT,
  name: 'idPerson3BenCess',
  labelName: 'ID 3',
  inputSubType: 'number',
  validators: { min: 0, max: 9999999 },
} as const;
export const dtEffBen = {
  type: FieldType.INPUT,
  name: 'dtEffBen',
  labelName: 'Dt. Eff. Réass.',
  inputSubType: 'date',
} as const;
export const coeffCumAmtBenCess = {
  type: FieldType.INPUT,
  name: 'coeffCumAmtBenCess',
  labelName: 'Coef. cumul.',
  inputSubType: 'text',
  validators: { required: false },
} as const;
export const pcCola = {
  type: FieldType.INPUT,
  name: 'pcCola',
  labelName: 'COLA',
  width: '2em',
  inputSubType: 'text',
} as const;
export const cdBenCessAutFac = {
  type: FieldType.INPUT,
  name: 'cdBenCessAutFac',
  labelName: 'Aut/Fac',
  inputSubType: 'text',
  validators: {
    //fieldValidation: ValidationService.validateAutFac,
    maxLength: 3,
  },
} as const;
export const idPerson4BenCess = {
  type: FieldType.INPUT,
  name: 'idPerson4BenCess',
  labelName: 'ID 4',
  inputSubType: 'number',
  validators: { min: 0, max: 9999999 },
} as const;
export const dtSysStBenCess = {
  type: FieldType.INPUT,
  name: 'dtSysStBenCess',
  labelName: 'Dt. Système',
  inputSubType: 'date',
  displayOption: { readonly: true },
} as const;
export const noSched = {
  type: FieldType.INPUT,
  name: 'noSched',
  labelName: 'Fréquence',
  inputSubType: 'text',
  validators: { min: 0, max: 999999999 },
} as const; // TODO : Vue de la table PLAN_BEN du module de traité.  Ne figure pas dans la table CESS_BENEFIT,
export const pcDiscount = {
  type: FieldType.INPUT,
  name: 'pcDiscount',
  labelName: 'Escompte',
  inputSubType: 'text',
} as const;
export const cdBenCessTrtSch = {
  type: FieldType.INPUT,
  name: 'cdBenCessTrtSch',
  labelName: 'TRT/SCH',
  inputSubType: 'text',
  validators: {
    //fieldValidation: ValidationService.validateSchTrt,
    maxLength: 3,
  },
} as const;
export const idPerson5BenCess = {
  type: FieldType.INPUT,
  name: 'idPerson5BenCess',
  labelName: 'ID 5',
  inputSubType: 'number',
  validators: { min: 0, max: 9999999 },
} as const;
export const noBenIssu = {
  type: FieldType.INPUT,
  name: 'noBenIssu',
  labelName: 'No Ben. Issu',
  inputSubType: 'text',
  validators: { min: 1, max: 999999 },
} as const;
export const duBen = {
  type: FieldType.INPUT,
  name: 'duBen',
  labelName: 'BP',
  width: '2rem',
  displayOption: { readonly: true, maskCurrency: true },
  inputSubType: 'text',
} as const;
export const cdDuCov = {
  type: FieldType.INPUT,
  name: 'cdDuCov',
  labelName: 'BP Cd',
  width: '2rem',
  displayOption: { readonly: true, maskCurrency: true },
  inputSubType: 'text',
} as const;
export const duWai = {
  type: FieldType.INPUT,
  name: 'duWai',
  labelName: 'EP',
  width: '2rem',
  displayOption: { readonly: true, maskCurrency: true },
  inputSubType: 'text',
} as const;
export const cdDuWai = {
  type: FieldType.INPUT,
  name: 'cdDuWai',
  width: '2rem',
  labelName: 'EP Cd',
  displayOption: { readonly: true, maskCurrency: true },
  inputSubType: 'text',
} as const;
export const CESS_BENEFITS_FIELDS = {
  vUltimateAmtBenCess,
  stBenCess,
  pcRatingBenCess,
  pcDiscount,
  pcCola,
  noTrtBenCess,
  noTrtAddBenCess,
  noSched,
  noBenIssu,
  noBenCumulIn,
  benefitNumber,
  modRegBenCess,
  idPlan,
  idBenPlan,
  idPerson5BenCess,
  idPerson4BenCess,
  idPerson3BenCess,
  idPerson2BenCess,
  idPerson1BenCess,
  duPricedBenCess,
  dtSysStBenCess,
  dtStBenCess,
  dtEffBen,
  dtBenCessOrig,
  dtBenCess,
  dtAnnBen,
  coeffCumAmtBenCess,
  cdTypDis,
  cdSmoPricedBenCess,
  cdOccPricedBenCess,
  cdGenPricedBenCess,
  cdExtraRatingBenCess,
  cdClsPricedBenCess,
  cdBenCessTrtSch,
  cdBenCessAutFac,
  cdBenCess,
  amtReinBenPrmCal,
  amtReinBenCess,
  amtPrevRetBenCess,
  amtFaceBenPrmCal,
  amtFaceBenCess,
  agePricedBenCess,
  duWai,
  cdDuWai,
  duBen,
  cdDuCov,
};
