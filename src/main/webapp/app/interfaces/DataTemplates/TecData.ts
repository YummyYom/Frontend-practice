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
export interface TecData {
  noTecht: number;
  minAgeBandTecht: number;
  maxAgeBandTecht: number;
  minPolyrBandTecht: number;
  maxPolyrBandTecht: number;
  valTecht: number;
}
