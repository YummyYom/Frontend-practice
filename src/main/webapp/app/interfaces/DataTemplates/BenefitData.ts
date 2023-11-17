import { FamDefData } from './FamDefData';
import { ScheduleData } from './ScheduleData';
import {
  agePricedBenCess,
  amtFaceBenCess,
  amtFaceBenPrmCal,
  amtPrevRetBenCess,
  amtReinBenCess,
  amtReinBenPrmCal,
  cdBenCess,
  cdBenCessAutFac,
  cdBenCessTrtSch,
  cdClsPricedBenCess,
  cdExtraRatingBenCess,
  cdGenPricedBenCess,
  cdOccPricedBenCess,
  cdSmoPricedBenCess,
  cdTypDis,
  coeffCumAmtBenCess,
  dtAnnBen,
  dtBenCess,
  dtBenCessOrig,
  dtEffBen,
  dtStBenCess,
  dtSysStBenCess,
  duPricedBenCess,
  idPerson1BenCess,
  idPerson2BenCess,
  idPerson3BenCess,
  idPerson4BenCess,
  idPerson5BenCess,
  idPlan,
  idBenPlan,
  modRegBenCess,
  benefitNumber,
  noBenCumulIn,
  noBenIssu,
  noSched,
  noTrtAddBenCess,
  noTrtBenCess,
  pcCola,
  pcDiscount,
  pcRatingBenCess,
  stBenCess,
  vUltimateAmtBenCess,
} from 'app/BlockInputFieldTemplates/CessBenefitsFields';

/**Object representation of the parsed JSON file retrieved from the database*/
export interface BenefitData {
  cessionId: number;
  vUltimateAmtBenCess: number;
  stBenCess: string;
  pcRatingBenCess: number;
  pcDiscount: number;
  pcCola: number;
  noTrtBenCess: number;
  noTrtAddBenCess: number;
  noSched: number;
  noBenIssu: number;
  noBenCumulIn: number;
  benefitNumber: number;
  modRegBenCess: string;
  idPlan: number;
  idBenPlan: number;
  idPerson5BenCess: number;
  idPerson4BenCess: number;
  idPerson3BenCess: number;
  idPerson2BenCess: number;
  idPerson1BenCess: number;
  duPricedBenCess: number;
  dtSysStBenCess: string;
  dtStBenCes: string;
  dtEffBen: string;
  dtBenCessOrig: string;
  dtBenCess: string;
  dtAnnBen: string;
  coeffCumAmtBenCess: number;
  cdTypDis: string;
  cdSmoPricedBenCess: string;
  cdOccPricedBenCess: string;
  cdGenPricedBenCess: string;
  cdExtraRatingBenCess: number;
  cdClsPricedBenCess: string;
  cdBenCessTrtSch: string;
  cdBenCessAutFac: string;
  cdBenCess: string;
  amtReinBenPrmCal: number;
  amtReinBenCess: number;
  amtPrevRetBenCess: number;
  amtFaceBenPrmCal: number;
  amtFaceBenCess: number;
  agePricedBenCess: number;
}
