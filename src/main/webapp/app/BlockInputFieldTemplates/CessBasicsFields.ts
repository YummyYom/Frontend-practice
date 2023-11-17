import { FieldType, InputFieldDef } from '../interfaces/FieldDef';

export const cessionId = {
  type: FieldType.INPUT,
  name: 'cessionId',
  labelName: 'No. Cession',
  width: '10em',
  displayOption: { sort: { active: true, order: 1 } },
  inputSubType: 'number',
} as const;
export const cdCompCess = {
  type: FieldType.INPUT,
  name: 'cdCompCess',
  labelName: 'Cédante',
  inputSubType: 'text',
  validators: { maxLength: 6 },
} as const;
export const stCess = {
  type: FieldType.INPUT,
  name: 'stCess',
  labelName: 'Statut',
  inputSubType: 'text',
  displayOption: { readonly: true },
} as const;
export const dtEffCess = {
  type: FieldType.INPUT,
  name: 'dtEffCess',
  labelName: 'Date eff. cession',
  inputSubType: 'date',
} as const;
export const cdProdCess = {
  type: FieldType.INPUT,
  name: 'cdProdCess',
  labelName: 'Produit',
  width: '9rem',
  inputSubType: 'text',
  validators: { maxLength: 8 },
} as const;
export const cdCessAutFac = {
  type: FieldType.INPUT,
  name: 'cdCessAutFac',
  labelName: 'Aut/Fac',
  inputSubType: 'text',
  validators: { maxLength: 3 },
} as const;
export const noPol = {
  type: FieldType.INPUT,
  name: 'noPol',
  labelName: 'Pol.',
  width: '8rem',
  inputSubType: 'text',
  validators: { maxLength: 12 },
} as const;
export const extNoPol = {
  type: FieldType.INPUT,
  name: 'extNoPol',
  labelName: 'Ext. Pol.',
  width: '3rem',
  inputSubType: 'text',
  validators: { maxLength: 2 },
} as const;
export const noDoc = {
  type: FieldType.INPUT,
  name: 'noDoc',
  labelName: 'Document',
  inputSubType: 'number',
  validators: { max: 99999999 },
  displayOption: { readonly: true },
} as const;
export const dtAnnPol = {
  type: FieldType.INPUT,
  name: 'dtAnnPol',
  labelName: 'Dt police',
  inputSubType: 'date',
} as const;
export const dtEffPol = {
  type: FieldType.INPUT,
  name: 'dtEffPol',
  labelName: 'Dt effective',
  inputSubType: 'date',
} as const;
export const cdPlanCess = {
  type: FieldType.INPUT,
  name: 'cdPlanCess',
  labelName: 'Plan',
  width: '12rem',
  inputSubType: 'text',
  validators: { maxLength: 18, pattern: /^{aaa}/i },
} as const;
export const cdEntrModCess = {
  type: FieldType.INPUT,
  name: 'cdEntrModCess',
  labelName: "Mode d'entrée",
  inputSubType: 'text',
  validators: { maxLength: 3 },
}; // TODO : typeOfCoverage is not a proper name. See how to address : cd_entr_mod_cess
export const refCedCess = {
  type: FieldType.INPUT,
  name: 'refCedCess',
  labelName: 'Ref',
  inputSubType: 'number',
  validators: { maxLength: 14 },
} as const;
export const cdCurrPol = {
  type: FieldType.INPUT,
  name: 'cdCurrPol',
  labelName: 'Devise',
  inputSubType: 'text',
  validators: { maxLength: 3 },
} as const;
export const cdTerrPrmTaxPol = {
  type: FieldType.INPUT,
  name: 'cdTerrPrmTaxPol',
  labelName: 'Code de taxe',
  inputSubType: 'text',
  validators: { maxLength: 3 },
} as const;
export const dtPayCess = {
  type: FieldType.INPUT,
  name: 'dtPayCess',
  labelName: 'Dt facturation',
  inputSubType: 'date',
} as const;
export const cdEntrModCessCnv = {
  type: FieldType.INPUT,
  name: 'cdEntrModCessCnv',
  labelName: 'Inter traité',
  inputSubType: 'text',
  validators: { maxLength: 1 },
  displayOption: { readonly: true },
} as const;
export const noApplCess = {
  type: FieldType.INPUT,
  name: 'noApplCess',
  labelName: 'No Appl.',
  inputSubType: 'number',
  validators: { maxLength: 8 },
} as const;
export const cdTypCnv = {
  type: FieldType.INPUT,
  name: 'cdTypCnv',
  labelName: 'Totale/Partielle',
  inputSubType: 'text',
  validators: { maxLength: 3 },
} as const;
export const cdTerrIssPol = {
  type: FieldType.INPUT,
  name: 'cdTerrIssPol',
  labelName: 'Ter. émission',
  inputSubType: 'text',
  validators: { maxLength: 3 },
} as const;
export const txtCess = {
  type: FieldType.INPUT,
  name: 'txtCess',
  labelName: 'Commentaire',
  inputSubType: 'text',
  validators: { maxLength: 2000 },
} as const;

export const CESS_BASICS_FIELDS = {
  cdCessAutFac,
  cdCompCess,
  cdCurrPol,
  cdEntrModCess,
  cdEntrModCessCnv,
  cdPlanCess,
  cdProdCess,
  cdTerrIssPol,
  cdTerrPrmTaxPol,
  cdTypCnv,
  dtAnnPol,
  dtEffCess,
  dtEffPol,
  dtPayCess,
  extNoPol,
  noApplCess,
  cessionId,
  noDoc,
  noPol,
  refCedCess,
  stCess,
  txtCess,
};
